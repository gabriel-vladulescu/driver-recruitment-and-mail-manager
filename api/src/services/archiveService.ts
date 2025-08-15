import { Op } from "sequelize";
import { InboxEmail, InboxArchive, InboxType, InboxCategory, InboxLabel } from "../models";
import { WhereClause } from "../types";
import { sanitizeSearchInput } from "../utils/common";

export class ArchiveService {

  async getArchivedEmails(page = 1, limit = 20, search?: string) {
    const offset = (page - 1) * limit;
    const whereClause: WhereClause = {};

    if (search) {
      const sanitizedSearch = sanitizeSearchInput(search);
      const orCondition = [
        { subject: { [Op.like]: `%${sanitizedSearch}%` } },
        { email_from: { [Op.like]: `%${sanitizedSearch}%` } },
        { email_from_name: { [Op.like]: `%${sanitizedSearch}%` } },
      ];
      (whereClause as any)[Op.or] = orCondition;
    }

    const emails = await InboxArchive.findAndCountAll({
      where: whereClause,
      include: [
        { model: InboxType, as: "inboxType" },
        { model: InboxCategory, as: "inboxCategory" },
        { model: InboxLabel, as: "inboxLabel", required: false },
      ],
      order: [["archived_at", "DESC"]],
      limit,
      offset,
    });

    return {
      emails: emails.rows,
      pagination: {
        total: emails.count,
        page,
        limit,
        totalPages: Math.ceil(emails.count / limit),
      },
    };
  }

  async moveToArchive(ids: number[]): Promise<{ archivedCount: number; foundCount: number }> {
    if (!ids || ids.length === 0) {
      throw new Error("Lista de ID-uri este necesară");
    }

    // Find emails to move to archive
    const emails = await InboxEmail.findAll({
      where: { id: { [Op.in]: ids } },
    });

    if (emails.length === 0) {
      throw new Error("Nu au fost găsite email-uri pentru arhivare");
    }

    // Create archive records with complete email data
    const archivedRecords = emails.map((email) => ({
      inbox_type_id: email.inbox_type_id,
      inbox_category_id: email.inbox_category_id,
      inbox_label_id: email.inbox_label_id,
      email_from: email.email_from,
      email_from_name: email.email_from_name,
      email_to: email.email_to,
      email_to_name: email.email_to_name,
      subject: email.subject,
      message: email.message,
      custom_data: email.custom_data,
      is_read: email.is_read,
      archived_at: new Date(),
    }));

    await InboxArchive.bulkCreate(archivedRecords);

    // Delete original emails
    await InboxEmail.destroy({
      where: { id: { [Op.in]: ids } },
    });

    return {
      archivedCount: emails.length,
      foundCount: emails.length
    };
  }

  async restoreFromArchive(ids: number[]): Promise<{ restoredCount: number; foundCount: number }> {
    if (!ids || ids.length === 0) {
      throw new Error("Lista de ID-uri este necesară");
    }

    // Find emails to restore from archive
    const archivedEmails = await InboxArchive.findAll({
      where: { id: { [Op.in]: ids } },
    });

    if (archivedEmails.length === 0) {
      throw new Error("Nu au fost găsite email-uri în arhivă pentru restaurare");
    }

    // Recreate emails in the main inbox using bulk operation
    const restoredRecords = archivedEmails.map(email => ({
      inbox_type_id: email.inbox_type_id,
      inbox_category_id: email.inbox_category_id,
      inbox_label_id: email.inbox_label_id,
      email_from: email.email_from,
      email_from_name: email.email_from_name,
      email_to: email.email_to,
      email_to_name: email.email_to_name,
      subject: email.subject,
      message: email.message,
      custom_data: email.custom_data,
      is_read: email.is_read,
    }));

    await InboxEmail.bulkCreate(restoredRecords);

    // Remove from archive
    await InboxArchive.destroy({
      where: { id: { [Op.in]: archivedEmails.map(email => email.id) } },
    });

    return {
      restoredCount: archivedEmails.length,
      foundCount: archivedEmails.length
    };
  }

  async getArchiveCount(): Promise<number> {
    return await InboxArchive.count();
  }

  // Helper methods for controller logic
  validateIds(ids: any): { valid: boolean; error?: string } {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return { valid: false, error: "Lista de ID-uri este necesară" };
    }
    return { valid: true };
  }

  generateRestoreMessage(restoredCount: number): string {
    return `${restoredCount} email${
      restoredCount > 1 ? "-uri au fost restaurate" : " a fost restaurat"
    } din arhivă`;
  }

  generateArchiveMessage(archivedCount: number): string {
    return `${archivedCount} email${
      archivedCount > 1 ? "-uri au fost arhivate" : " a fost arhivat"
    }`;
  }

  generatePartialWarningMessage(message: string, notFoundCount: number, type: 'archive' | 'general' = 'general'): string {
    const location = type === 'archive' ? ' în arhivă' : '';
    return `Partial Update: ${message}. ${notFoundCount} email${
      notFoundCount > 1 ? `-uri nu au fost găsite${location}` : ` nu a fost găsit${location}`
    }.`;
  }
}

export default new ArchiveService();
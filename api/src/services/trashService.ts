import { Op } from "sequelize";
import { InboxEmail, InboxArchive, InboxTrash, InboxDeleted, InboxType, InboxCategory, InboxLabel } from "../models";
import { WhereClause } from "../types";
import { sanitizeSearchInput } from "../utils/common";

export class TrashService {

  async getTrashedEmails(page = 1, limit = 20, search?: string) {
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

    const emails = await InboxTrash.findAndCountAll({
      where: whereClause,
      include: [
        { model: InboxType, as: "inboxType" },
        { model: InboxCategory, as: "inboxCategory" },
        { model: InboxLabel, as: "inboxLabel", required: false },
      ],
      order: [["trashed_at", "DESC"]],
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

  async moveToTrash(ids: number[], fromArchive = false): Promise<{ movedCount: number; foundCount: number }> {
    if (!ids || ids.length === 0) {
      throw new Error("Lista de ID-uri este necesară");
    }

    // Find emails to move to trash - check archive if fromArchive is true
    const emails = fromArchive 
      ? await InboxArchive.findAll({
          where: { id: { [Op.in]: ids } },
        })
      : await InboxEmail.findAll({
          where: { id: { [Op.in]: ids } },
        });

    if (emails.length === 0) {
      throw new Error("Nu au fost găsite email-uri pentru mutare în coș");
    }

    // Create trash records with complete email data
    const trashedRecords = emails.map((email) => ({
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
      is_read: true,
      trashed_at: new Date(),
    }));

    await InboxTrash.bulkCreate(trashedRecords);

    // Delete original emails from the appropriate table
    if (fromArchive) {
      await InboxArchive.destroy({
        where: { id: { [Op.in]: ids } },
      });
    } else {
      await InboxEmail.destroy({
        where: { id: { [Op.in]: ids } },
      });
    }

    return {
      movedCount: emails.length,
      foundCount: emails.length
    };
  }

  async restoreFromTrash(ids: number[]): Promise<{ restoredCount: number; foundCount: number }> {
    if (!ids || ids.length === 0) {
      throw new Error("Lista de ID-uri este necesară");
    }

    // Find emails to restore from trash
    const trashedEmails = await InboxTrash.findAll({
      where: { id: { [Op.in]: ids } },
    });

    if (trashedEmails.length === 0) {
      throw new Error("Nu au fost găsite email-uri în coșul de gunoi pentru restaurare");
    }

    // Recreate emails in the main inbox using bulk operation
    const restoredRecords = trashedEmails.map(email => ({
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

    // Remove from trash
    await InboxTrash.destroy({
      where: { id: { [Op.in]: trashedEmails.map(email => email.id) } },
    });

    return {
      restoredCount: trashedEmails.length,
      foundCount: trashedEmails.length
    };
  }

  async cleanTrash(ids: number[]): Promise<{ deletedCount: number; foundCount: number }> {
    if (!ids || ids.length === 0) {
      throw new Error("Lista de ID-uri este necesară");
    }

    // Find emails in trash to permanently delete
    const trashedEmails = await InboxTrash.findAll({
      where: { id: { [Op.in]: ids } },
    });

    if (trashedEmails.length === 0) {
      throw new Error("Nu au fost găsite email-uri în coșul de gunoi pentru ștergerea definitivă");
    }

    // Save email info to inbox_deleted table before permanent deletion for audit
    const auditRecords = trashedEmails.map(email => ({
      message_id: `trash-${email.id}-${Date.now()}`,
      email_from: email.email_from,
      subject: email.subject || "Fără subiect",
      deleted_at: new Date(),
    }));

    await InboxDeleted.bulkCreate(auditRecords);
    await InboxTrash.destroy({
      where: { id: { [Op.in]: trashedEmails.map(email => email.id) } },
    });

    return {
      deletedCount: trashedEmails.length,
      foundCount: trashedEmails.length
    };
  }

  async getTrashCount(): Promise<number> {
    return await InboxTrash.count();
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
    } din coșul de gunoi`;
  }

  generateDeleteMessage(deletedCount: number): string {
    return `${deletedCount} email${
      deletedCount > 1 ? "-uri au fost șterse definitiv" : " a fost șters definitiv"
    }`;
  }

  generateMoveMessage(movedCount: number): string {
    return `${movedCount} email${
      movedCount > 1 ? "-uri au fost mutate" : " a fost mutat"
    } în coș`;
  }

  generatePartialWarningMessage(message: string, notFoundCount: number): string {
    return `Partial Update: ${message}. ${notFoundCount} email${
      notFoundCount > 1 ? '-uri nu au fost găsite în coș' : ' nu a fost găsit în coș'
    }.`;
  }
}

export default new TrashService();
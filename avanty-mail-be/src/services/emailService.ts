import { Op } from "sequelize";
import { InboxEmail, InboxType, InboxCategory, InboxLabel } from "../models";
import { 
  InboxEmailQuery, 
  WhereClause, 
  EmailsWithPagination,
  PaginationData 
} from "../types";
import { 
  sanitizeSearchInput,
  parsePaginationParams,
  calculatePaginationMeta,
} from "../utils/common";

export class EmailService {
  
  async getEmails(query: InboxEmailQuery): Promise<EmailsWithPagination> {
    const { category, inbox_category_id, label, page, limit, search } = query;

    // Parse pagination with validation
    const { page: parsedPage, limit: parsedLimit, offset } = parsePaginationParams(page, limit);

    // Build where clause efficiently
    const whereClause: WhereClause = {};

    // Handle category filtering
    if (inbox_category_id) {
      // Direct category ID filtering (preferred method)
      whereClause.inbox_category_id = parseInt(inbox_category_id);
      // When filtering by category, exclude labeled emails (they appear only in label views)
      (whereClause as any).inbox_label_id = null;
    } else if (category) {
      // Legacy category name filtering (for backward compatibility)
      const inboxCategory = await InboxCategory.findOne({
        where: { category },
      });
      if (inboxCategory) {
        whereClause.inbox_category_id = inboxCategory.id;
        // When filtering by category, exclude labeled emails (they appear only in label views)
        (whereClause as any).inbox_label_id = null;
      }
    } else if (label) {
      // Label filtering
      const labelId = parseInt(label);
      if (!isNaN(labelId)) {
        whereClause.inbox_label_id = labelId;
      }
    }
    // For "All Messages" view (no category and no label), show ALL emails including labeled ones

    if (search) {
      const sanitizedSearch = sanitizeSearchInput(search);
      const orCondition = [
        { subject: { [Op.like]: `%${sanitizedSearch}%` } },
        { email_from: { [Op.like]: `%${sanitizedSearch}%` } },
        { email_from_name: { [Op.like]: `%${sanitizedSearch}%` } },
      ];
      (whereClause as any)[Op.or] = orCondition;
    }

    const emails = await InboxEmail.findAndCountAll({
      where: whereClause,
      include: [
        { model: InboxType, as: "inboxType" },
        { model: InboxCategory, as: "inboxCategory" },
        { model: InboxLabel, as: "inboxLabel", required: false },
      ],
      order: [["createdAt", "DESC"]],
      limit: parsedLimit,
      offset,
    });

    // Calculate unread count for the same filter criteria
    const unreadWhereClause = { ...whereClause, is_read: false };
    const unreadCount = await InboxEmail.count({ where: unreadWhereClause });

    const paginationMeta = calculatePaginationMeta(emails.count, parsedPage, parsedLimit, unreadCount);

    return {
      emails: emails.rows,
      pagination: paginationMeta,
    };
  }

  async markAsRead(ids: number[], isRead: boolean): Promise<{ updatedCount: number; foundCount: number }> {
    // Find emails to update
    const emails = await InboxEmail.findAll({
      where: { id: { [Op.in]: ids } }
    });

    if (emails.length === 0) {
      throw new Error("Nu au fost găsite email-uri pentru actualizarea stării de citire");
    }

    // Update all emails to the same read status
    const [updatedCount] = await InboxEmail.update(
      { is_read: isRead },
      { where: { id: { [Op.in]: emails.map(email => email.id) } } }
    );

    return {
      updatedCount,
      foundCount: emails.length
    };
  }

  async getEmailCounts(): Promise<any> {
    // Get all emails count
    const totalCount = await InboxEmail.count();

    // Get category counts (emails without labels)
    const categories = await InboxCategory.findAll();
    const categoryCounts = await Promise.all(
      categories.map(async (category) => {
        const total = await InboxEmail.count({
          where: {
            inbox_category_id: category.id,
            inbox_label_id: null,
          } as any,
        });
        const unread = await InboxEmail.count({
          where: {
            inbox_category_id: category.id,
            inbox_label_id: null,
            is_read: false,
          } as any,
        });
        return {
          id: category.id,
          category: category.category,
          name: category.name,
          total,
          unread,
        };
      })
    );

    // Get label counts
    const labels = await InboxLabel.findAll();
    const labelCounts = await Promise.all(
      labels.map(async (label) => {
        const total = await InboxEmail.count({
          where: {
            inbox_label_id: label.id,
          },
        });
        return {
          id: label.id,
          label: label.label,
          total,
        };
      })
    );

    // Calculate total unread count across all emails
    const totalUnreadCount = await InboxEmail.count({
      where: {
        is_read: false,
      },
    });

    return {
      total: totalCount,
      totalUnread: totalUnreadCount,
      categories: categoryCounts,
      labels: labelCounts,
    };
  }

  async moveToLabel(ids: number[], labelId: string): Promise<{ updatedCount: number; foundCount: number }> {
    const emails = await InboxEmail.findAll({
      where: { id: { [Op.in]: ids } },
    });

    if (emails.length === 0) {
      throw new Error("Nu au fost găsite email-uri pentru aplicarea etichetei");
    }

    const toUpdate = emails.filter((email) => email.inbox_label_id !== parseInt(labelId));

    // Update emails with the label - convert labelId to number
    const [updatedCount] = await InboxEmail.update(
      { 
        inbox_label_id: parseInt(labelId) 
      },
      {
        where: {
          id: {
            [Op.in]: toUpdate.map((email) => email.id),
          },
        },
      }
    );

    return {
      updatedCount,
      foundCount: emails.length
    };
  }

  // Helper methods for controller logic
  validateIds(ids: any): { valid: boolean; error?: string } {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return { valid: false, error: "Lista de ID-uri este necesară" };
    }
    return { valid: true };
  }

  validateReadStatus(is_read: any): { valid: boolean; error?: string } {
    if (typeof is_read !== "boolean") {
      return { valid: false, error: "Valoarea is_read trebuie să fie boolean" };
    }
    return { valid: true };
  }

  generateReadMessage(foundCount: number, is_read: boolean): string {
    return `${foundCount} email${
      foundCount > 1 ? "-uri au fost marcate ca" : " a fost marcat ca"
    } ${is_read ? (foundCount > 1 ? "citite" : "citit") : (foundCount > 1 ? "necitite" : "necitit")}`;
  }

  generatePartialWarningMessage(message: string, notFoundCount: number): string {
    return `Partial Update: ${message}. ${notFoundCount} email${
      notFoundCount > 1 ? '-uri nu au fost găsite' : ' nu a fost găsit'
    }.`;
  }

  // Aggregate all email counts in one service method
  async getAllEmailCounts() {
    const emailCounts = await this.getEmailCounts();
    
    // Import other services here to avoid circular imports
    const trashService = (await import('./trashService')).default;
    const archiveService = (await import('./archiveService')).default;
    
    const trashCount = await trashService.getTrashCount();
    const archiveCount = await archiveService.getArchiveCount();
    
    return {
      ...emailCounts,
      trash: trashCount,
      archive: archiveCount,
    };
  }
}

export default new EmailService();
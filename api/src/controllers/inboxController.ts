import { Request, Response } from "express";
import { Op } from "sequelize";
import { InboxEmail, InboxType, InboxCategory, InboxLabel, InboxDeleted, InboxArchive, InboxTrash } from "../models";
import { InboxEmailQuery, WhereClause, EmailsWithPagination } from "../types";
import {
  sendErrorResponse,
  sendSuccessResponse,
  sanitizeSearchInput,
  parsePaginationParams,
  calculatePaginationMeta,
} from "../utils/common";
import { ResponseStatus } from "../config/constants";

export const getEmails = async (req: Request, res: Response) => {
  try {
    const { category, inbox_category_id, label, page, limit, search } = req.query as InboxEmailQuery;

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

    sendSuccessResponse<EmailsWithPagination>(res, {
      emails: emails.rows,
      pagination: paginationMeta,
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Eroare la preluarea email-urilor", error);
  }
};

export const getLabels = async (req: Request, res: Response) => {
  try {
    const labels = await InboxLabel.findAll({
      order: [["label", "ASC"]],
    });

    res.json({
      success: true,
      data: labels,
    });
  } catch (error) {
    console.error("Get labels error:", error);
    res.status(500).json({
      success: false,
      message: "Eroare la preluarea etichetelor",
    });
  }
};

export const createLabel = async (req: Request, res: Response) => {
  try {
    const { label, color, icon } = req.body;

    if (!label) {
      return res.status(400).json({
        success: false,
        message: "Numele etichetei este obligatoriu",
      });
    }

    const newLabel = await InboxLabel.create({
      label,
      color: color || "#6b7280",
      icon: icon || "Tag",
    });

    res.status(201).json({
      success: true,
      message: "Eticheta a fost creată",
      data: newLabel,
    });
  } catch (error) {
    console.error("Create label error:", error);
    res.status(500).json({
      success: false,
      message: "Eroare la crearea etichetei",
    });
  }
};

export const updateLabel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { label, color, icon } = req.body;

    const existingLabel = await InboxLabel.findByPk(id);
    if (!existingLabel) {
      return res.status(404).json({
        success: false,
        message: "Eticheta nu a fost găsită",
      });
    }

    await existingLabel.update({
      label: label || existingLabel.label,
      color: color || existingLabel.color,
      icon: icon || existingLabel.icon,
    });

    res.json({
      success: true,
      message: "Eticheta a fost actualizată",
      data: existingLabel,
    });
  } catch (error) {
    console.error("Update label error:", error);
    res.status(500).json({
      success: false,
      message: "Eroare la actualizarea etichetei",
    });
  }
};

export const deleteLabel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const label = await InboxLabel.findByPk(id);
    if (!label) {
      return res.status(404).json({
        success: false,
        message: "Eticheta nu a fost găsită",
      });
    }

    // Remove label from all emails before deleting
    await InboxEmail.update({ inbox_label_id: null } as any, {
      where: { inbox_label_id: id },
    });

    await label.destroy();

    res.json({
      success: true,
      message: "Eticheta a fost ștearsă",
    });
  } catch (error) {
    console.error("Delete label error:", error);
    res.status(500).json({
      success: false,
      message: "Eroare la ștergerea etichetei",
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await InboxCategory.findAll({
      order: [["name", "ASC"]],
    });

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({
      success: false,
      message: "Eroare la preluarea categoriilor",
    });
  }
};

export const getEmailsFromTrash = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    const whereClause: WhereClause = {};

    if (search) {
      const sanitizedSearch = sanitizeSearchInput(search as string);
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
      limit: parseInt(limit as string),
      offset,
    });

    res.json({
      success: true,
      data: {
        emails: emails.rows,
        pagination: {
          total: emails.count,
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          totalPages: Math.ceil(emails.count / parseInt(limit as string)),
        },
      },
    });
  } catch (error) {
    console.error("Get deleted emails error:", error);
    res.status(500).json({
      success: false,
      message: "Eroare la preluarea email-urilor șterse",
    });
  }
};

export const getEmailsFromArchive = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    const whereClause: WhereClause = {};

    if (search) {
      const sanitizedSearch = sanitizeSearchInput(search as string);
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
      limit: parseInt(limit as string),
      offset,
    });

    res.json({
      success: true,
      data: {
        emails: emails.rows,
        pagination: {
          total: emails.count,
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          totalPages: Math.ceil(emails.count / parseInt(limit as string)),
        },
      },
    });
  } catch (error) {
    console.error("Get archived emails error:", error);
    res.status(500).json({
      success: false,
      message: "Eroare la preluarea email-urilor arhivate",
    });
  }
};

export const restoreFromTrash = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: ResponseStatus.Error,
        message: "Lista de ID-uri este necesară",
      });
    }

    // Find emails to restore from trash
    const trashedEmails = await InboxTrash.findAll({
      where: { id: { [Op.in]: ids } },
    });

    if (trashedEmails.length === 0) {
      return res.status(404).json({
        status: ResponseStatus.Error,
        message: "Nu au fost găsite email-uri în coșul de gunoi pentru restaurare",
      });
    }

    if (trashedEmails.length !== ids.length) {
      return res.status(400).json({
        status: ResponseStatus.Error,
        message: "Nu toate ID-urile specificate au fost găsite în coșul de gunoi",
      });
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

    const message = `${trashedEmails.length} email${trashedEmails.length > 1 ? "-uri au fost restaurate" : " a fost restaurat"} din coșul de gunoi`;

    // Check if we found fewer emails than requested
    if (trashedEmails.length < ids.length) {
      return res.status(200).json({
        status: ResponseStatus.Warning,
        message: `Partial Update: ${message}. ${ids.length - trashedEmails.length} email${ids.length - trashedEmails.length > 1 ? '-uri nu au fost găsite în coș' : ' nu a fost găsit în coș'}.`,
        restoredCount: trashedEmails.length,
        requestedCount: ids.length,
      });
    }

    return res.status(200).json({
      status: ResponseStatus.Success,
      message: message,
      restoredCount: trashedEmails.length,
    });
  } catch (error) {
    return res.status(500).json({
      status: ResponseStatus.Error,
      message: "Eroare la restaurarea email-urilor",
      error
    });
  }
};

export const cleanTrash = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: ResponseStatus.Error,
        message: "Lista de ID-uri este necesară",
      });
    }

    // Find emails in trash to permanently delete
    const trashedEmails = await InboxTrash.findAll({
      where: { id: { [Op.in]: ids } },
    });

    if (trashedEmails.length === 0) {
      return res.status(404).json({
        status: ResponseStatus.Error,
        message: "Nu au fost găsite email-uri în coșul de gunoi pentru ștergerea definitivă",
      });
    }

    if (trashedEmails.length !== ids.length) {
      return res.status(400).json({
        status: ResponseStatus.Error,
        message: "Nu toate ID-urile specificate au fost găsite în coșul de gunoi",
      });
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

    const message = `${trashedEmails.length} email${trashedEmails.length > 1 ? "-uri au fost șterse definitiv" : " a fost șters definitiv"}`;
    if (trashedEmails.length < ids.length) {
      return res.status(200).json({
        status: ResponseStatus.Warning,
        message: `Partial Update: ${message}. ${ids.length - trashedEmails.length} email${ids.length - trashedEmails.length > 1 ? '-uri nu au fost găsite în coș' : ' nu a fost găsit în coș'}.`,
        deletedCount: trashedEmails.length,
        requestedCount: ids.length,
      });
    }

    return res.status(200).json({
      status: ResponseStatus.Success,
      message: message,
      deletedCount: trashedEmails.length,
    });
  } catch (error) {
    return res.status(500).json({
      status: ResponseStatus.Error,
      message: "Eroare la ștergerea definitivă a email-urilor",
      error
    });
  }
};

export const restoreFromArchive = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: ResponseStatus.Error,
        message: "Lista de ID-uri este necesară",
      });
    }

    // Find emails to restore from archive
    const archivedEmails = await InboxArchive.findAll({
      where: { id: { [Op.in]: ids } },
    });

    if (archivedEmails.length === 0) {
      return res.status(404).json({
        status: ResponseStatus.Error,
        message: "Nu au fost găsite email-uri în arhivă pentru restaurare",
      });
    }

    if (archivedEmails.length !== ids.length) {
      return res.status(400).json({
        status: ResponseStatus.Error,
        message: "Nu toate ID-urile specificate au fost găsite în arhivă",
      });
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

    const message = `${archivedEmails.length} email${archivedEmails.length > 1 ? "-uri au fost restaurate" : " a fost restaurat"} din arhivă`;

    // Check if we found fewer emails than requested
    if (archivedEmails.length < ids.length) {
      return res.status(200).json({
        status: ResponseStatus.Warning,
        message: `Partial Update: ${message}. ${ids.length - archivedEmails.length} email${ids.length - archivedEmails.length > 1 ? '-uri nu au fost găsite în arhivă' : ' nu a fost găsit în arhivă'}.`,
        restoredCount: archivedEmails.length,
        requestedCount: ids.length,
      });
    }

    return res.status(200).json({
      status: ResponseStatus.Success,
      message: message,
      restoredCount: archivedEmails.length,
    });
  } catch (error) {
    return res.status(500).json({
      status: ResponseStatus.Error,
      message: "Eroare la restaurarea email-urilor din arhivă",
      error
    });
  }
};

export const getEmailCounts = async (req: Request, res: Response) => {
  try {
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

    // Get trash count
    const trashCount = await InboxTrash.count();

    // Get archive count  
    const archiveCount = await InboxArchive.count();

    // Calculate total unread count across all emails
    const totalUnreadCount = await InboxEmail.count({
      where: {
        is_read: false,
      },
    });

    res.json({
      success: true,
      data: {
        total: totalCount,
        totalUnread: totalUnreadCount,
        categories: categoryCounts,
        labels: labelCounts,
        trash: trashCount,
        archive: archiveCount,
      },
    });
  } catch (error) {
    console.error("Get email counts error:", error);
    res.status(500).json({
      success: false,
      message: "Eroare la obținerea count-urilor",
    });
  }
};

export const moveToTrash = async (req: Request, res: Response) => {
  try {
    const { ids, from_archive } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: ResponseStatus.Error,
        message: "Lista de ID-uri este necesară",
      });
    }

    // Find emails to move to trash - check archive if from_archive is true
    const emails = from_archive 
      ? await InboxArchive.findAll({
          where: { id: { [Op.in]: ids } },
        })
      : await InboxEmail.findAll({
          where: { id: { [Op.in]: ids } },
        });

    if (emails.length === 0) {
      return res.status(404).json({
        status: ResponseStatus.Error,
        message: "Nu au fost găsite email-uri pentru mutare în coș",
      });
    }

    if (emails.length !== ids.length) {
      return res.status(400).json({
        status: ResponseStatus.Error,
        message: "Nu toate ID-urile specificate au fost găsite",
      });
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
    if (from_archive) {
      await InboxArchive.destroy({
        where: { id: { [Op.in]: ids } },
      });
    } else {
      await InboxEmail.destroy({
        where: { id: { [Op.in]: ids } },
      });
    }

    const message = `${emails.length} email${emails.length > 1 ? "-uri au fost mutate" : " a fost mutat"} în coș`;

    // Check if we found fewer emails than requested
    if (emails.length < ids.length) {
      return res.status(200).json({
        status: ResponseStatus.Warning,
        message: `Partial Update: ${message}. ${ids.length - emails.length} email${ids.length - emails.length > 1 ? '-uri nu au fost găsite' : ' nu a fost găsit'}.`,
        movedCount: emails.length,
        requestedCount: ids.length,
      });
    }

    return res.status(200).json({
      status: ResponseStatus.Success,
      message: message,
      movedCount: emails.length,
    });
  } catch (error) {
    return res.status(500).json({
      status: ResponseStatus.Error,
      message: "Eroare la mutarea email-urilor în coș",
      error
    });
  }
};

export const moveToLabel = async (req: Request, res: Response) => {
  try {
    const { labelId } = req.params;
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: ResponseStatus.Error,
        message: "Lista de ID-uri este necesară",
      });
    }

    // Validate label exists
    const label = await InboxLabel.findByPk(labelId);
    if (!label) {
      return res.status(404).json({
        success: ResponseStatus.Error,
        message: "Eticheta nu a fost găsită",
      });
    }

    const emails = await InboxEmail.findAll({
      where: { id: { [Op.in]: ids } },
    });

    if (emails.length === 0) {
      return res.status(404).json({
        status: ResponseStatus.Error,
        message: "Nu au fost găsite email-uri pentru aplicarea etichetei",
      });
    }

    if (emails.length !== ids.length) {
      return res.status(400).json({
        status: ResponseStatus.Error,
        message: "Nu toate ID-urile specificate au fost găsite",
      });
    }

    const toUpdate = emails.filter((email) => email.inbox_label_id !== parseInt(labelId));
    const existing = emails.filter((email) => email.inbox_label_id === parseInt(labelId));

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

    if (updatedCount === 0) {
      return res.status(200).json({
        status: ResponseStatus.Warning,
        message: `No Update: Eticheta este deja aplicată.`,
      });
    }

    const message = `Eticheta a fost aplicată la ${updatedCount} ` +
      `email${updatedCount > 1 ? "-uri" : ""} din ${ids.length} `;

    if (existing.length > 0) {
      return res.status(200).json({
        status: ResponseStatus.Warning,
        message: `Partial Update: ${message}.`,
      });
    }

    return res.status(200).json({
      status: ResponseStatus.Success,
      message: message,
    });
  } catch (error) {
    return res.status(500).json({
      status: ResponseStatus.Error,
      message: "Eroare la aplicarea etichetei",
      error
    });
  }
};

export const moveToArchive = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: ResponseStatus.Error,
        message: "Lista de ID-uri este necesară",
      });
    }

    // Find emails to move to archive
    const emails = await InboxEmail.findAll({
      where: { id: { [Op.in]: ids } },
    });

    if (emails.length === 0) {
      return res.status(404).json({
        status: ResponseStatus.Error,
        message: "Nu au fost găsite email-uri pentru arhivare",
      });
    }

    if (emails.length !== ids.length) {
      return res.status(400).json({
        status: ResponseStatus.Error,
        message: "Nu toate ID-urile specificate au fost găsite",
      });
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

    const message = `${emails.length} email${emails.length > 1 ? "-uri au fost arhivate" : " a fost arhivat"}`;

    // Check if we found fewer emails than requested
    if (emails.length < ids.length) {
      return res.status(200).json({
        status: ResponseStatus.Warning,
        message: `Partial Update: ${message}. ${ids.length - emails.length} email${ids.length - emails.length > 1 ? '-uri nu au fost găsite' : ' nu a fost găsit'}.`,
        archivedCount: emails.length,
        requestedCount: ids.length,
      });
    }

    return res.status(200).json({
      status: ResponseStatus.Success,
      message: message,
      archivedCount: emails.length,
    });
  } catch (error) {
    return res.status(500).json({
      status: ResponseStatus.Error,
      message: "Eroare la arhivarea email-urilor",
      error
    });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { ids, is_read } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: ResponseStatus.Error,
        message: "Lista de ID-uri este necesară",
      });
    }

    if (typeof is_read !== "boolean") {
      return res.status(400).json({
        status: ResponseStatus.Error,
        message: "Valoarea is_read trebuie să fie boolean",
      });
    }

    // Find emails to update
    const emails = await InboxEmail.findAll({
      where: { id: { [Op.in]: ids } }
    });

    if (emails.length === 0) {
      return res.status(404).json({
        status: ResponseStatus.Error,
        message: "Nu au fost găsite email-uri pentru actualizarea stării de citire",
      });
    }

    // Update all emails to the same read status
    const [updatedCount] = await InboxEmail.update(
      { is_read },
      { where: { id: { [Op.in]: emails.map(email => email.id) } } }
    );

    const message = `${emails.length} email${emails.length > 1 ? "-uri au fost marcate ca" : " a fost marcat ca"} ${is_read ? (emails.length > 1 ? "citite" : "citit") : (emails.length > 1 ? "necitite" : "necitit")}`;

    // Check if we found fewer emails than requested
    if (emails.length < ids.length) {
      return res.status(200).json({
        status: ResponseStatus.Warning,
        message: `Partial Update: ${message}. ${ids.length - emails.length} email${ids.length - emails.length > 1 ? '-uri nu au fost găsite' : ' nu a fost găsit'}.`,
        updatedCount,
        foundCount: emails.length,
        requestedCount: ids.length,
      });
    }

    return res.status(200).json({
      status: ResponseStatus.Success,
      message,
      updatedCount,
    });
  } catch (error) {
    return res.status(500).json({
      status: ResponseStatus.Error,
      message: "Eroare la actualizarea stării de citire",
      error
    });
  }
};
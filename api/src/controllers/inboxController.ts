import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { InboxEmail, InboxType, InboxCategory, InboxLabel, InboxDeleted } from '../models';
import ImapService from '../services/imapService';
import { ApiResponse, InboxEmailQuery, WhereClause, EmailsWithPagination, LabelData, UpdateEmailData } from '../types';
import { sendErrorResponse, sendSuccessResponse, validateEntityExists, sanitizeSearchInput, parsePaginationParams, calculatePaginationMeta } from '../utils/common';

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
      const inboxCategory = await InboxCategory.findOne({ where: { category } });
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
        { email_from_name: { [Op.like]: `%${sanitizedSearch}%` } }
      ];
      (whereClause as any)[Op.or] = orCondition;
    }

    const emails = await InboxEmail.findAndCountAll({
      where: whereClause,
      include: [
        { model: InboxType, as: 'inboxType' },
        { model: InboxCategory, as: 'inboxCategory' },
        { model: InboxLabel, as: 'inboxLabel', required: false }
      ],
      order: [['createdAt', 'DESC']],
      limit: parsedLimit,
      offset
    });

    // Calculate unread count for the same filter criteria
    const unreadWhereClause = { ...whereClause, is_read: false };
    const unreadCount = await InboxEmail.count({ where: unreadWhereClause });

    const paginationMeta = calculatePaginationMeta(emails.count, parsedPage, parsedLimit, unreadCount);

    sendSuccessResponse<EmailsWithPagination>(res, {
      emails: emails.rows,
      pagination: paginationMeta
    });
  } catch (error) {
    sendErrorResponse(res, 500, 'Eroare la preluarea email-urilor', error);
  }
};

export const getEmailById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const email = await InboxEmail.findByPk(id, {
      include: [
        { model: InboxType, as: 'inboxType' },
        { model: InboxCategory, as: 'inboxCategory' },
        { model: InboxLabel, as: 'inboxLabel', required: false }
      ]
    });

    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email nu a fost găsit'
      });
    }

    res.json({
      success: true,
      data: email
    });
  } catch (error) {
    console.error('Get email by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la preluarea email-ului'
    });
  }
};

export const updateEmailReadStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { is_read } = req.body;

    const email = await InboxEmail.findByPk(id);
    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email nu a fost găsit'
      });
    }

    await email.update({ is_read });

    res.json({
      success: true,
      message: 'Statusul de citire a fost actualizat',
      data: email
    });
  } catch (error) {
    console.error('Update read status error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la actualizarea statusului'
    });
  }
};

export const deleteEmail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const email = await InboxEmail.findByPk(id);
    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email nu a fost găsit'
      });
    }

    await email.destroy();

    res.json({
      success: true,
      message: 'Email-ul a fost șters'
    });
  } catch (error) {
    console.error('Delete email error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la ștergerea email-ului'
    });
  }
};

export const updateEmailLabel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { inbox_label_id } = req.body;

    const email = await InboxEmail.findByPk(id);
    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email nu a fost găsit'
      });
    }

    // Validate label exists if provided
    if (inbox_label_id) {
      const label = await InboxLabel.findByPk(inbox_label_id);
      if (!label) {
        return res.status(400).json({
          success: false,
          message: 'Eticheta nu a fost găsită'
        });
      }
    }

    await email.update({ inbox_label_id: inbox_label_id || null });

    // Reload with associations
    const updatedEmail = await InboxEmail.findByPk(id, {
      include: [
        { model: InboxType, as: 'inboxType' },
        { model: InboxCategory, as: 'inboxCategory' },
        { model: InboxLabel, as: 'inboxLabel', required: false }
      ]
    });

    res.json({
      success: true,
      message: 'Eticheta a fost actualizată',
      data: updatedEmail
    });
  } catch (error) {
    console.error('Update email label error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la actualizarea etichetei'
    });
  }
};

export const getLabels = async (req: Request, res: Response) => {
  try {
    const labels = await InboxLabel.findAll({
      order: [['label', 'ASC']]
    });

    res.json({
      success: true,
      data: labels
    });
  } catch (error) {
    console.error('Get labels error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la preluarea etichetelor'
    });
  }
};

export const createLabel = async (req: Request, res: Response) => {
  try {
    const { label, color, icon } = req.body;

    if (!label) {
      return res.status(400).json({
        success: false,
        message: 'Numele etichetei este obligatoriu'
      });
    }

    const newLabel = await InboxLabel.create({
      label,
      color: color || '#6b7280',
      icon: icon || 'Tag'
    });

    res.status(201).json({
      success: true,
      message: 'Eticheta a fost creată',
      data: newLabel
    });
  } catch (error) {
    console.error('Create label error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la crearea etichetei'
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
        message: 'Eticheta nu a fost găsită'
      });
    }

    await existingLabel.update({
      label: label || existingLabel.label,
      color: color || existingLabel.color,
      icon: icon || existingLabel.icon
    });

    res.json({
      success: true,
      message: 'Eticheta a fost actualizată',
      data: existingLabel
    });
  } catch (error) {
    console.error('Update label error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la actualizarea etichetei'
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
        message: 'Eticheta nu a fost găsită'
      });
    }

    // Remove label from all emails before deleting
    await InboxEmail.update(
      { inbox_label_id: null } as any,
      { where: { inbox_label_id: id } }
    );

    await label.destroy();

    res.json({
      success: true,
      message: 'Eticheta a fost ștearsă'
    });
  } catch (error) {
    console.error('Delete label error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la ștergerea etichetei'
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await InboxCategory.findAll({
      order: [['name', 'ASC']]
    });


    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la preluarea categoriilor'
    });
  }
};

export const fetchEmailsFromServer = async (req: Request, res: Response) => {
  try {
    const imapService = new ImapService();
    const result = await imapService.fetchAllEmails();

    res.json({
      success: result.success,
      message: result.message,
      data: {
        emailsProcessed: result.emailsProcessed
      }
    });
  } catch (error) {
    console.error('Fetch emails error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la preluarea email-urilor de pe server'
    });
  }
};

export const testImapConnection = async (req: Request, res: Response) => {
  try {
    const imapService = new ImapService();
    const result = await imapService.testConnection();

    res.json(result);
  } catch (error) {
    console.error('Test IMAP connection error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la testarea conexiunii IMAP'
    });
  }
};

export const getDeletedEmails = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    const whereClause: WhereClause = {};
    
    if (search) {
      // Sanitize search input to prevent SQL injection
      const sanitizedSearch = search.toString().replace(/[%_\\]/g, '\\$&');
      const orCondition = [
        { subject: { [Op.like]: `%${sanitizedSearch}%` } },
        { email_from: { [Op.like]: `%${sanitizedSearch}%` } },
        { email_from_name: { [Op.like]: `%${sanitizedSearch}%` } }
      ];
      (whereClause as any)[Op.or] = orCondition;
    }

    const emails = await InboxEmail.findAndCountAll({
      where: {
        ...whereClause,
        deletedAt: { [Op.not]: null } as any
      },
      include: [
        { model: InboxType, as: 'inboxType' },
        { model: InboxCategory, as: 'inboxCategory' },
        { model: InboxLabel, as: 'inboxLabel', required: false }
      ],
      order: [['deletedAt', 'DESC']],
      limit: parseInt(limit as string),
      offset,
      paranoid: false // Include deleted emails
    });

    res.json({
      success: true,
      data: {
        emails: emails.rows,
        pagination: {
          total: emails.count,
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          totalPages: Math.ceil(emails.count / parseInt(limit as string))
        }
      }
    });
  } catch (error) {
    console.error('Get deleted emails error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la preluarea email-urilor șterse'
    });
  }
};

export const restoreEmail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const email = await InboxEmail.findByPk(id, { paranoid: false });
    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email nu a fost găsit'
      });
    }

    if (!email.deletedAt) {
      return res.status(400).json({
        success: false,
        message: 'Email-ul nu este șters'
      });
    }

    await email.restore();

    res.json({
      success: true,
      message: 'Email-ul a fost restaurat'
    });
  } catch (error) {
    console.error('Restore email error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la restaurarea email-ului'
    });
  }
};

export const permanentlyDeleteEmail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const email = await InboxEmail.findByPk(id, { paranoid: false });
    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email nu a fost găsit'
      });
    }

    // Save email info to inbox_deleted table before permanent deletion
    try {
      // Extract Message-ID from custom_data
      let messageId = `fallback-${email.id}-${Date.now()}`;
      if (email.custom_data && typeof email.custom_data === 'object') {
        const customData = email.custom_data as any;
        if (customData.messageId) {
          messageId = customData.messageId;
        }
      }

      // Check if already exists before trying to create
      const existingDeleted = await InboxDeleted.findOne({
        where: { message_id: messageId },
        paranoid: false // Explicitly disable paranoid mode for this query
      });

      if (!existingDeleted) {
        await InboxDeleted.create({
          message_id: messageId,
          email_from: email.email_from,
          subject: email.subject || 'Fără subiect',
          deleted_at: new Date()
        });
      }
    } catch (insertError: any) {
      // Handle any remaining unique constraint errors gracefully
      if (insertError.name === 'SequelizeUniqueConstraintError') {
        console.log('Email already exists in inbox_deleted, continuing with deletion');
      } else {
        console.error('Error saving to inbox_deleted:', insertError);
        return res.status(500).json({
          success: false,
          message: 'Eroare la salvarea informațiilor de ștergere'
        });
      }
    }

    await email.destroy({ force: true });

    res.json({
      success: true,
      message: 'Email-ul a fost șters definitiv'
    });
  } catch (error) {
    console.error('Permanently delete email error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la ștergerea definitivă'
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
            inbox_label_id: null
          } as any
        });
        const unread = await InboxEmail.count({
          where: {
            inbox_category_id: category.id,
            inbox_label_id: null,
            is_read: false
          } as any
        });
        return {
          id: category.id,
          category: category.category,
          name: category.name,
          total,
          unread
        };
      })
    );

    // Get label counts
    const labels = await InboxLabel.findAll();
    const labelCounts = await Promise.all(
      labels.map(async (label) => {
        const total = await InboxEmail.count({
          where: {
            inbox_label_id: label.id
          }
        });
        return {
          id: label.id,
          label: label.label,
          total
        };
      })
    );

    // Get trash count
    const trashCount = await InboxDeleted.count();

    // Calculate total unread count across all emails
    const totalUnreadCount = await InboxEmail.count({
      where: {
        is_read: false
      }
    });

    res.json({
      success: true,
      data: {
        total: totalCount,
        totalUnread: totalUnreadCount,
        categories: categoryCounts,
        labels: labelCounts,
        trash: trashCount
      }
    });
  } catch (error) {
    console.error('Get email counts error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la obținerea count-urilor'
    });
  }
};
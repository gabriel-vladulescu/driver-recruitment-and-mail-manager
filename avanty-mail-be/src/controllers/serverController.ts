import { Request, Response } from "express";
import { InboxCategory, InboxEmail, InboxType } from "../models";
import { ResponseStatus } from "../types";
import { ApiResponse } from "../utils/common";
import ImapService from "../services/imapService";
import smtpService from "../services/smtpService";

export const testImapConnection = async (req: Request, res: Response): Promise<Response> => {
    try {
        const imapService = new ImapService();
        const result = await imapService.testConnection();

        if (result.success) {
            return ApiResponse(res, ResponseStatus.Success, `Conexiunea IMAP a fost testată cu succes. Au fost gasite ${result.count} email-uri.`);
        }

        return ApiResponse(res, ResponseStatus.Error, 'Eroare la testarea conexiunii IMAP');
    } catch (error) {
        return ApiResponse(res, ResponseStatus.Error, error, 'Eroare la testarea conexiunii IMAP', 500);
    }
};

export const testSmtpConnection = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await smtpService.testConnection();

        if (result.success) {
            return ApiResponse(res, ResponseStatus.Success, 'Conexiunea SMTP a fost testată cu succes');
        }

        return ApiResponse(res, ResponseStatus.Error, 'Eroare la testarea conexiunii SMTP');
    } catch (error) {
        return ApiResponse(res, ResponseStatus.Error, error, 'Eroare la testarea conexiunii SMTP', 500);
    }
}

export const getInternalInboxEmails = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const imapService = new ImapService();
        const result = await imapService.fetchAllEmails();

        if (result.success) {
            return ApiResponse(res, ResponseStatus.Success, result, 'Email-urile au fost preluate cu succes de pe server');
        }

        return ApiResponse(res, ResponseStatus.Error, 'Eroare la preluarea email-urilor de pe server');
    } catch (error) {
        return ApiResponse(res, ResponseStatus.Error, error, 'Eroare la preluarea email-urilor de pe server', 500);
    }
};

export const replyToEmail = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { to, subject, content, inReplyTo } = req.body;

        if (!to || !subject || !content) {
            return ApiResponse(res, ResponseStatus.Error, 'Câmpurile to, subject și content sunt obligatorii');
        }

        // Send email
        await smtpService.sendReply({
            to,
            subject,
            content,
            inReplyTo
        });

        // Get EMAILS_SENT category and INTERNAL_INBOX type
        const [sentCategory, internalType] = await Promise.all([
            InboxCategory.findOne({ where: { category: 'EMAILS_SENT' } }),
            InboxType.findOne({ where: { type: 'INTERNAL_INBOX' } })
        ]);

        if (!sentCategory || !internalType) {
            return ApiResponse(res, ResponseStatus.Error, 'Categorie sau tip intern necesar nu a fost găsit');
        }

        // Get original email to extract the sender's name for email_to_name
        let originalEmailFromName = to; // fallback to email address
        if (inReplyTo) {
            const originalEmail = await InboxEmail.findByPk(inReplyTo);
            if (originalEmail) {
                originalEmailFromName = originalEmail.email_from_name || originalEmail.email_from;
            }
        }

        const signature = '<h2>Bloom Driver Support</h2>'; // Example signature, can be dynamic
        // Save reply as inbox_email with EMAILS_SENT category
        const sentReply = await InboxEmail.create({
            subject,
            email_from: 'admin@bloom.ro',
            email_from_name: 'Admin',
            email_to: to,
            email_to_name: originalEmailFromName,
            message: content + (signature ? `\n\n${signature}` : ''),
            is_read: true,
            inbox_type_id: internalType.id,
            inbox_category_id: sentCategory.id,
            custom_data: {
                isReply: true,
                originalEmailId: inReplyTo ? parseInt(inReplyTo) : null,
                signature: signature || null
            }
        });

        return ApiResponse(res, ResponseStatus.Success, 
            {
            emailId: sentReply.id
            },
            'Email trimis cu succes'
        );
    } catch (error) {
        return ApiResponse(res, ResponseStatus.Error, error, 'Eroare la trimiterea email-ului', 500);
    }
}
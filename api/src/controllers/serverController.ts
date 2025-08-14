import { Request, Response } from "express";
import { InboxCategory, InboxEmail, InboxType } from "../models";
import { ResponseStatus } from "../config/constants";
import ImapService from "../services/imapService";
import smtpService from "../services/smtpService";

export const testImapConnection = async (req: Request, res: Response) => {
    try {
        const imapService = new ImapService();
        const result = await imapService.testConnection();

        if (result.success) {
            return res.json({
                status: ResponseStatus.Success,
                message: 'Conexiunea IMAP a fost testată cu succes. Au fost gasite ' + result.count + ' email-uri.',
            });
        }

        return res.json({
            status: ResponseStatus.Error,
            message: 'Eroare la testarea conexiunii IMAP',
        });
    } catch (error) {
        res.status(500).json({
            status: ResponseStatus.Error,
            message: "Eroare la testarea conexiunii IMAP",
            error
        });
    }
};

export const testSmtpConnection = async (req: Request, res: Response) => {
    try {
        const result = await smtpService.testConnection();

        if (result.success) {
            return res.json({
                status: ResponseStatus.Success,
                message: 'Conexiunea SMTP a fost testată cu succes',
            });
        }

        return res.json({
            status: ResponseStatus.Error,
            message: 'Eroare la testarea conexiunii SMTP',
        });
    } catch (error: any) {
        res.status(500).json({
            status: ResponseStatus.Error,
            message: 'Eroare la testarea conexiunii SMTP',
            error
        });
    }
}

export const getInternalInboxEmails = async (req: Request, res: Response) => {
    try {
        const imapService = new ImapService();
        const result = await imapService.fetchAllEmails();

        if (result.success) {
            return res.json({
                status: ResponseStatus.Success,
                message: 'Email-urile au fost preluate cu succes de pe server',
                result
            });
        }

        return res.json({
            status: ResponseStatus.Error,
            message: 'Eroare la preluarea email-urilor de pe server',
        });
    } catch (error) {
        res.status(500).json({
            status: ResponseStatus.Error,
            message: "Eroare la preluarea email-urilor de pe server",
            error
        });
    }
};

export const replyToEmail = async (req: Request, res: Response) => {
    try {
        const { to, subject, content, inReplyTo } = req.body;

        if (!to || !subject || !content) {
            return res.status(400).json({
                success: false,
                message: 'Câmpurile to, subject și content sunt obligatorii'
            });
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
            throw new Error('Required category or type not found');
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

        res.json({
            success: true,
            message: 'Email trimis cu succes',
            data: {
                emailId: sentReply.id
            }
        });
    } catch (error: any) {
        console.error('Error sending reply:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Eroare la trimiterea email-ului'
        });
    }
}
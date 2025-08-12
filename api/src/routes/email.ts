import express from 'express';
import emailService from '../services/emailService';
import { authenticateToken } from '../middleware/auth';
import { InboxEmail, InboxType, InboxCategory, InboxLabel } from '../models';

const router = express.Router();

// Send reply email
router.post('/reply', authenticateToken, async (req, res) => {
  try {
    const { to, subject, content, signature, replyTo } = req.body;

    if (!to || !subject || !content) {
      return res.status(400).json({
        success: false,
        message: 'Câmpurile to, subject și content sunt obligatorii'
      });
    }

    // Send email
    await emailService.sendReply({
      to,
      subject,
      content,
      signature,
      replyTo
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
    if (replyTo) {
      const originalEmail = await InboxEmail.findByPk(replyTo);
      if (originalEmail) {
        originalEmailFromName = originalEmail.email_from_name || originalEmail.email_from;
      }
    }

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
        originalEmailId: replyTo ? parseInt(replyTo) : null,
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
});

// Get sent replies (now from inbox_emails with EMAILS_SENT category)
router.get('/sent-replies', authenticateToken, async (req, res) => {
  try {
    const { formId } = req.query;
    
    // Get EMAILS_SENT category
    const sentCategory = await InboxCategory.findOne({ where: { category: 'EMAILS_SENT' } });
    if (!sentCategory) {
      return res.status(500).json({
        success: false,
        message: 'EMAILS_SENT category not found'
      });
    }
    
    const whereClause: any = {
      inbox_category_id: sentCategory.id
    };
    
    // If formId is provided, filter by replies to that specific email
    if (formId) {
      whereClause.custom_data = {
        isReply: true,
        originalEmailId: parseInt(formId as string)
      };
    } else {
      // Only get replies (not regular sent emails)
      whereClause['custom_data.isReply'] = true;
    }
    
    const sentReplies = await InboxEmail.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      include: [
        { model: InboxType, as: 'inboxType' },
        { model: InboxCategory, as: 'inboxCategory' },
        { model: InboxLabel, as: 'inboxLabel', required: false }
      ]
    });

    res.json({
      success: true,
      data: sentReplies
    });
  } catch (error: any) {
    console.error('Error fetching sent replies:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Eroare la încărcarea reply-urilor'
    });
  }
});

// Test email connection
router.get('/test-connection', authenticateToken, async (req, res) => {
  try {
    const results = await emailService.testConnection();
    
    res.json({
      success: true,
      data: results,
      message: 'Test conexiune finalizat'
    });
  } catch (error: any) {
    console.error('Error testing connection:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Eroare la testarea conexiunii'
    });
  }
});

export default router;
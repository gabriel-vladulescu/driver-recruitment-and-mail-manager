import express from 'express';
import emailService from '../services/emailService';
import { authenticateToken } from '../middleware/auth';
import { SentReply } from '../models';

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

    // Save reply to database
    const sentReply = await SentReply.create({
      original_form_id: replyTo ? parseInt(replyTo) : undefined,
      subject,
      sent_to: to,
      message: content,
      signature: signature || undefined,
      sent_by_user_id: req.user!.id
    });

    res.json({
      success: true,
      message: 'Email trimis cu succes',
      data: {
        replyId: sentReply.id
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

// Get sent replies
router.get('/sent-replies', authenticateToken, async (req, res) => {
  try {
    const { formId } = req.query;
    
    const whereClause: any = {};
    if (formId) {
      whereClause.original_form_id = parseInt(formId as string);
    }
    
    const sentReplies = await SentReply.findAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
      include: [
        {
          association: 'sentByUser',
          attributes: ['id', 'email']
        },
        {
          association: 'originalForm',
          attributes: ['id', 'subject', 'type'],
          required: false
        }
      ]
    });

    const formattedReplies = sentReplies.map(reply => reply.toApiResponse());

    res.json({
      success: true,
      data: formattedReplies
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
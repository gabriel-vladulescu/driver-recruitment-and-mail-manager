import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { 
  replyToEmail,
  getInternalInboxEmails, 
  testImapConnection, 
  testSmtpConnection 
} from '../controllers/serverController';

const router = express.Router();
router.use(authenticateToken);
router.get('/emails', getInternalInboxEmails);
router.post('/reply', replyToEmail);
router.get('/connection-test/imap', testImapConnection);
router.get('/connection-test/smtp', testSmtpConnection);

export default router;
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  getEmails,
  getEmailById,
  updateEmailReadStatus,
  updateEmailLabel,
  deleteEmail,
  getLabels,
  createLabel,
  updateLabel,
  deleteLabel,
  getCategories,
  fetchEmailsFromServer,
  testImapConnection,
  getDeletedEmails,
  restoreEmail,
  permanentlyDeleteEmail
} from '../controllers/inboxController';

const router = Router();

// All inbox routes require authentication
router.use(authenticateToken);

// Email management
router.get('/emails', getEmails);
router.get('/emails/:id', getEmailById);
router.patch('/emails/:id/read', updateEmailReadStatus);
router.patch('/emails/:id/label', updateEmailLabel);
router.delete('/emails/:id', deleteEmail);

// Label management
router.get('/labels', getLabels);
router.post('/labels', createLabel);
router.patch('/labels/:id', updateLabel);
router.delete('/labels/:id', deleteLabel);

// Categories
router.get('/categories', getCategories);

// Email fetching from server
router.post('/fetch-emails', fetchEmailsFromServer);
router.get('/test-imap', testImapConnection);

// Trash management
router.get('/trash', getDeletedEmails);
router.post('/emails/:id/restore', restoreEmail);
router.delete('/emails/:id/permanent', permanentlyDeleteEmail);

export default router;
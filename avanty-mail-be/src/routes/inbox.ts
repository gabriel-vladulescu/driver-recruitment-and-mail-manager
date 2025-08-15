import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  getEmails,
  getLabels,
  createLabel,
  updateLabel,
  deleteLabel,
  getCategories,
  getEmailsFromTrash,
  getEmailsFromArchive,
  restoreFromTrash,
  restoreFromArchive,
  cleanTrash,
  moveToTrash,
  moveToLabel,
  moveToArchive,
  markAsRead,
  getEmailCounts
} from '../controllers/inboxController';

const router = Router();

// All inbox routes require authentication
router.use(authenticateToken);

// Email management
router.get('/emails', getEmails);
router.post('/emails/read', markAsRead);
router.post('/emails/label/:labelId', moveToLabel);

// Label management
router.get('/labels', getLabels);
router.post('/labels', createLabel);
router.patch('/labels/:id', updateLabel);
router.delete('/labels/:id', deleteLabel);

// Categories
router.get('/categories', getCategories);

// Counts
router.get('/counts', getEmailCounts);

// Trash management
router.get('/trash', getEmailsFromTrash);
router.post('/trash', moveToTrash);
router.post('/trash/restore', restoreFromTrash);
router.post('/trash/clean', cleanTrash);

// Archive management
router.get('/archive', getEmailsFromArchive);
router.post('/archive', moveToArchive);
router.post('/archive/restore', restoreFromArchive);

export default router;
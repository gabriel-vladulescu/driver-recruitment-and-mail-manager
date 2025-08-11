import { Router } from 'express';
import { 
  getAllForms, 
  getFormById, 
  updateReadStatus, 
  updateArchiveStatus,
  createForm 
} from '../controllers/formsController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public route for form submissions
// POST /api/forms
router.post('/', createForm);

// Protected routes (require authentication)
// GET /api/forms
router.get('/', authenticateToken, getAllForms);

// GET /api/forms/:id
router.get('/:id', authenticateToken, getFormById);

// PATCH /api/forms/:id/read
router.patch('/:id/read', authenticateToken, updateReadStatus);

// PATCH /api/forms/:id/archive
router.patch('/:id/archive', authenticateToken, updateArchiveStatus);

export default router;
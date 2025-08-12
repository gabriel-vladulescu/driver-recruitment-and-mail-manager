import { Router } from 'express';
import { 
  getAllForms, 
  getFormById, 
  updateReadStatus, 
  moveToTrash,
  createForm 
} from '../controllers/formsController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public route for form data
// POST /api/forms
router.post('/', createForm);

// Protected routes (require authentication)
// GET /api/forms
router.get('/', authenticateToken, getAllForms);

// GET /api/forms/:id
router.get('/:id', authenticateToken, getFormById);

// PATCH /api/forms/:id/read
router.patch('/:id/read', authenticateToken, updateReadStatus);

// DELETE /api/forms/:id (move to trash)
router.delete('/:id', authenticateToken, moveToTrash);

export default router;
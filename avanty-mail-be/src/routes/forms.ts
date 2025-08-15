import { Router } from 'express';
import { createForm } from '../controllers/formsController';

const router = Router();

// Public route for inserting forms as emails
router.post('/', createForm);

export default router;
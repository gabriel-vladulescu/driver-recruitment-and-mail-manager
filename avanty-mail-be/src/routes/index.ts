import { Router } from 'express';
import authRoutes from './auth';
import formsRoutes from './forms';
import serverRoutes from './server';
import inboxRoutes from './inbox';


const router = Router();
router.use('/auth', authRoutes);
router.use('/server', serverRoutes);
router.use('/inbox', inboxRoutes);
router.use('/forms', formsRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

export default router;
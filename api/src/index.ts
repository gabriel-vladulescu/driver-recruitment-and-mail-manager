import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { syncDatabase } from './models';
import sequelize from './config/database';
import authRoutes from './routes/auth';
import formsRoutes from './routes/forms';
import emailRoutes from './routes/email';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for API
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware with UTF-8 support
app.use(express.json({ 
  limit: '10mb',
  type: ['application/json', 'text/plain']
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb'
}));

// Ensure UTF-8 encoding
app.use((req, res, next) => {
  req.headers['content-type'] = req.headers['content-type'] || 'application/json; charset=utf-8';
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/forms', formsRoutes);
app.use('/api/email', emailRoutes);

// Legacy routes for backward compatibility with admin panel
app.use('/login', authRoutes);
app.use('/forms', formsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Eroare internă de server' 
      : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint nu a fost găsit'
  });
});

// Start server
const startServer = async () => {
  try {
    // Initialize database
    await syncDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔐 CORS allowed origins: ${allowedOrigins.join(', ')}`);
      console.log('\n📋 Available endpoints:');
      console.log('  POST /api/auth/login - Admin login');
      console.log('  GET  /api/auth/me - Get current user');
      console.log('  POST /api/forms - Create form submission (public)');
      console.log('  GET  /api/forms - Get all forms (protected)');
      console.log('  GET  /api/forms/:id - Get form details (protected)');
      console.log('  PATCH /api/forms/:id/read - Update read status (protected)');
      console.log('  PATCH /api/forms/:id/archive - Update archive status (protected)');
      console.log('  POST /api/email/reply - Send reply email (protected)');
      console.log('  GET  /api/email/sent-replies - Get sent replies (protected)');
      console.log('  GET  /api/email/test-connection - Test email connection (protected)');
      console.log('  GET  /health - Health check');
      console.log('\n✅ Server started successfully!');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
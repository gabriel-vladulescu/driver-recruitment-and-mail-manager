import cors from 'cors';
import helmet from 'helmet';
import { Router } from 'express';
import env from '../config/env';

export function securityMiddleware() {
  const router = Router();

  // Helmet for security headers
  router.use(
    helmet({
      contentSecurityPolicy: false, // Disable CSP for APIs
      crossOriginEmbedderPolicy: false,
    })
  );

  // CORS configuration
  const allowedOrigins = env.ALLOWED_ORIGINS.split(',');

  const corsOrigin = (requestOrigin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (e.g., mobile apps or curl)
    if (!requestOrigin) {
      return callback(null, true);
    }

    if (typeof requestOrigin === 'string' && allowedOrigins.includes(requestOrigin)) {
      return callback(null, true);
    }

    const msg =
      'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  };

  router.use(
    cors({
      origin: corsOrigin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  return router;
}

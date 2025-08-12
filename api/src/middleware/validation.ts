import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from '../utils/common';

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sanitize string input by removing potentially harmful characters
 */
export const sanitizeString = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .substring(0, 1000); // Limit length
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

/**
 * Middleware to validate email in request body
 */
export const validateEmailMiddleware = (field: string = 'email') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const email = req.body[field];
    
    if (!email) {
      return sendErrorResponse(res, 400, `Câmpul ${field} este obligatoriu`);
    }
    
    if (!validateEmail(email)) {
      return sendErrorResponse(res, 400, `Format invalid pentru ${field}`);
    }
    
    // Sanitize the email
    req.body[field] = sanitizeString(email);
    next();
  };
};

/**
 * Middleware to sanitize string inputs
 */
export const sanitizeInputs = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fields.forEach(field => {
      if (req.body[field] && typeof req.body[field] === 'string') {
        req.body[field] = sanitizeString(req.body[field]);
      }
      if (req.query[field] && typeof req.query[field] === 'string') {
        req.query[field] = sanitizeString(req.query[field] as string);
      }
    });
    next();
  };
};

/**
 * Middleware to validate required fields
 */
export const validateRequiredFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields = fields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return sendErrorResponse(
        res, 
        400, 
        `Câmpurile următoare sunt obligatorii: ${missingFields.join(', ')}`
      );
    }
    
    next();
  };
};

/**
 * Middleware to validate pagination parameters
 */
export const validatePagination = (req: Request, res: Response, next: NextFunction) => {
  const { page, limit } = req.query;
  
  if (page && (isNaN(Number(page)) || Number(page) < 1)) {
    return sendErrorResponse(res, 400, 'Parametrul page trebuie să fie un număr pozitiv');
  }
  
  if (limit && (isNaN(Number(limit)) || Number(limit) < 1 || Number(limit) > 100)) {
    return sendErrorResponse(res, 400, 'Parametrul limit trebuie să fie între 1 și 100');
  }
  
  next();
};

/**
 * Middleware to validate boolean fields
 */
export const validateBooleanFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of fields) {
      const value = req.body[field];
      if (value !== undefined && typeof value !== 'boolean') {
        return sendErrorResponse(res, 400, `Câmpul ${field} trebuie să fie boolean`);
      }
    }
    next();
  };
};

/**
 * Rate limiting middleware (simple implementation)
 */
const requestCounts = new Map<string, { count: number; lastReset: number }>();

export const rateLimit = (maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    
    const clientData = requestCounts.get(ip) || { count: 0, lastReset: now };
    
    // Reset count if window has passed
    if (now - clientData.lastReset > windowMs) {
      clientData.count = 0;
      clientData.lastReset = now;
    }
    
    clientData.count++;
    requestCounts.set(ip, clientData);
    
    if (clientData.count > maxRequests) {
      return sendErrorResponse(res, 429, 'Prea multe cereri. Încercați din nou mai târziu.');
    }
    
    // Set headers for rate limiting info
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - clientData.count));
    res.setHeader('X-RateLimit-Reset', (clientData.lastReset + windowMs).toString());
    
    next();
  };
};
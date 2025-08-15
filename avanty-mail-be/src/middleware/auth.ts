import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import { JWTPayload } from '../types';
import { User } from '../models';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acces lipsă'
      });
    }

    const jwtSecret = env.JWT_SECRET;

    // Verify token
    const decoded = jwt.verify(token, jwtSecret) as JWTPayload;
    
    // Find user
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token invalid - utilizatorul nu există'
      });
    }

    // Attach user to request
    req.user = user;
    next();

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: 'Token invalid'
      });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: 'Token expirat'
      });
    }

    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Eroare de autentificare'
    });
  }
};

export const generateToken = (user: User): string => {
  const payload: JWTPayload = {
    id: user.id,
    email: user.email
  };
  
  // JWT library accepts string values like "7d", "1h", "30m", etc.
  const secret: string = env.JWT_SECRET;
  return jwt.sign(payload, secret, { expiresIn: env.JWT_EXPIRES_IN });
};
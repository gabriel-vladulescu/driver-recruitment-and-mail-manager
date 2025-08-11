import { Request, Response } from 'express';
import { User } from '../models';
import { generateToken } from '../middleware/auth';
import { ApiResponse } from '../types';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email și parola sunt obligatorii'
      } as ApiResponse);
    }

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email sau parolă incorectă'
      } as ApiResponse);
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Email sau parolă incorectă'
      } as ApiResponse);
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email
        }
      }
    } as ApiResponse);

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare internă de server'
    } as ApiResponse);
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const user = req.user!; // Guaranteed by auth middleware

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email
      }
    } as ApiResponse);

  } catch (error) {
    console.error('Me endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare internă de server'
    } as ApiResponse);
  }
};
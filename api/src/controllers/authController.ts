import { Request, Response } from 'express';
import { User } from '../models';
import { generateToken } from '../middleware/auth';
import { ResponseStatus } from '../types';
import { ApiResponse } from '../utils/common';

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return ApiResponse(res, ResponseStatus.Error, 'Email și parola sunt obligatorii.');
    }

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return ApiResponse(res, ResponseStatus.Unauthorized, 'Email sau parolă incorectă.');
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return ApiResponse(res, ResponseStatus.Unauthorized, 'Email sau parolă incorectă.');
    }

    // Generate token
    const token = generateToken(user);

    return ApiResponse(res, ResponseStatus.Success, {
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Autentificarea nu a putut fi realizată.", 500);
  }
};

export const me = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = req.user!; // Guaranteed by auth middleware

    return ApiResponse(res, ResponseStatus.Success, {
      id: user.id,
      email: user.email
    });

  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Nu s-a putut găsii userul autentificat.", 500);
  }
};
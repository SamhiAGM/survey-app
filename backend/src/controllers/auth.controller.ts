import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import logger from '../utils/logger';

export const checkAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { field, value } = req.query;
    if (!field || !value || typeof field !== 'string' || typeof value !== 'string') {
      res.status(400).json({ success: false, error: 'Invalid parameters' });
      return;
    }
    const isAvailable = await authService.checkAvailability(field, value);
    res.status(200).json({ success: true, isAvailable });
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const ipAddress = req.ip || req.headers['x-forwarded-for']?.toString() || '0.0.0.0';
    const result = await authService.registerUser(req.body, ipAddress);
    res.status(201).json({ success: true, message: result.message });
  } catch (error: any) {
    if (error.message && error.message.includes('already in use')) {
      res.status(409).json({ success: false, error: error.message });
      return;
    }
    next(error);
  }
};

export const verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, code } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for']?.toString() || '0.0.0.0';
    
    const result = await authService.verifyRegistrationOTP(email, code, ipAddress);
    
    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as 'strict'
    };

    res.status(200)
      .cookie('access_token', result.accessToken, { ...options, expires: new Date(Date.now() + 15 * 60 * 1000) }) // 15 mins for access
      .cookie('refresh_token', result.refreshToken, options) // 7 days for refresh
      .json({ success: true, message: result.message, data: result.user, token: result.accessToken });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const resendOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    const result = await authService.resendRegistrationOTP(email);
    res.status(200).json({ success: true, message: result.message });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Please provide an email and password' });
      return;
    }

    const result = await authService.loginUser(email, password);
    if (!result) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as 'strict'
    };

    res.status(200)
      .cookie('access_token', result.accessToken, { ...options, expires: new Date(Date.now() + 15 * 60 * 1000) }) // 15 mins for access
      .cookie('refresh_token', result.refreshToken, options) // 7 days for refresh
      .json({ success: true, data: result.user, token: result.accessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.cookie('access_token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.cookie('refresh_token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.info('Request received for forgot password');
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    res.status(200).json({ success: true, message: result.message });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, code, newPassword } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for']?.toString() || '0.0.0.0';
    
    const result = await authService.resetPassword(email, code, newPassword, ipAddress);
    res.status(200).json({ success: true, message: result.message });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

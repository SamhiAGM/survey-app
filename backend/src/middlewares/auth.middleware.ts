import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.access_token) {
    token = req.cookies.access_token;
  }

  if (!token) {
    res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
    // Note: Population of role might be needed depending on implementation
    req.user = await User.findById((decoded as any).id).populate('role');
    if (!req.user) {
      res.status(401).json({ success: false, error: 'User not found' });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    return;
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !req.user.role || !roles.includes(req.user.role.name)) {
      res.status(403).json({ success: false, error: 'User role is not authorized to access this route' });
      return;
    }
    next();
  };
};

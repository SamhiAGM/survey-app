import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Generate a random 6 digit OTP
export const generateOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

export const generateTokens = (userId: string, roleId: string) => {
  const payload = { userId, roleId };
  
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as jwt.SignOptions['expiresIn'],
  });
  
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || 'refresh_secret', {
    expiresIn: (process.env.REFRESH_TOKEN_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'],
  });
  
  return { accessToken, refreshToken };
};

export const verifyToken = (token: string, type: 'access' | 'refresh' = 'access') => {
  try {
    const secret = type === 'access' 
      ? process.env.JWT_SECRET || 'secret'
      : process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';
      
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

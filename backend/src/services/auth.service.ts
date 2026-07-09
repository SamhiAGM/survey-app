import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

import Role from '../models/Role';

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || '15m') as jwt.SignOptions['expiresIn']
  });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn']
  });
  return { accessToken, refreshToken };
};

export const registerUser = async (userData: any) => {
  // Automatically find or create a default role for new users
  let defaultRole = await Role.findOne({ name: 'Field Officer' });
  if (!defaultRole) {
    defaultRole = await Role.create({ name: 'Field Officer', permissions: ['view_surveys', 'submit_responses'] });
  }
  userData.role = defaultRole._id;
  
  const user = await User.create(userData);
  return user;
};

export const loginUser = async (email: string, password: string): Promise<{ user: IUser, accessToken: string, refreshToken: string } | null> => {
  const user = await User.findOne({ email }).select('+password').populate('role');
  if (!user) return null;

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return null;

  const { accessToken, refreshToken } = generateTokens(user._id as unknown as string);
  return { user, accessToken, refreshToken };
};

import User, { IUser } from '../models/User';
import Role from '../models/Role';
import AuditLog from '../models/AuditLog';
import { generateTokens } from '../utils/security';
import EmailService from './EmailService';
import OTPService from './OTPService';
import logger from '../utils/logger';

export const checkAvailability = async (field: string, value: string) => {
  const query: Record<string, string> = {};
  query[field] = value;
  const user = await User.findOne(query);
  return !user;
};

export const registerUser = async (userData: any, ipAddress: string) => {
  // Check for duplicates
  const duplicateFields = ['email', 'username', 'nic', 'employeeId', 'mobileNumber'];
  for (const field of duplicateFields) {
    if (userData[field]) {
      const exists = await User.findOne({ [field]: userData[field] });
      if (exists) {
        throw new Error(`${field} is already in use`);
      }
    }
  }

  // Assign Default Role
  let defaultRole = await Role.findOne({ name: 'User' });
  if (!defaultRole) {
    defaultRole = await Role.create({ name: 'User', permissions: ['view_dashboard'] });
  }
  userData.role = defaultRole._id;
  
  // Always set as pending until OTP verification
  userData.status = 'pending_approval';
  userData.isEmailVerified = false;

  const user = await User.create(userData);

  // Generate and send OTP using OTPService
  await OTPService.generateAndSendOTP(user.email, 'REGISTRATION', user.firstName);

  // Audit Log
  await AuditLog.create({
    user: user._id,
    action: 'REGISTER',
    module: 'Auth',
    details: { email: user.email },
    ipAddress,
    status: 'Success'
  });

  return { message: 'Registration successful. Please verify your email with the OTP sent.' };
};

export const verifyRegistrationOTP = async (email: string, code: string, ipAddress: string) => {
  await OTPService.verifyOTP(email, code, 'REGISTRATION');

  // Update user status
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  
  user.isEmailVerified = true;
  user.status = 'active'; 
  await user.save();
  
  await AuditLog.create({
    user: user._id,
    action: 'VERIFY_OTP',
    module: 'Auth',
    details: { email: user.email },
    ipAddress,
    status: 'Success'
  });
  
  // Generate token and return so user is logged in automatically
  const { accessToken, refreshToken } = generateTokens(user._id as unknown as string, user.role as unknown as string);
  
  // Optionally send welcome email
  EmailService.sendEmail({
    to: user.email,
    subject: 'Welcome to the Ministry of Health Survey Management System',
    html: `<p>Dear ${user.firstName},</p><p>Your account has been successfully verified.</p>`
  });

  return { message: 'OTP verified successfully', accessToken, refreshToken, user };
};

export const resendRegistrationOTP = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  if (user.isEmailVerified) throw new Error('Email is already verified');

  await OTPService.generateAndSendOTP(email, 'REGISTRATION', user.firstName);
  return { message: 'A new OTP has been sent to your email.' };
};

export const loginUser = async (email: string, password: string): Promise<{ user: IUser, accessToken: string, refreshToken: string } | null> => {
  const user = await User.findOne({ email }).select('+password').populate('role');
  if (!user) return null;

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return null;

  const { accessToken, refreshToken } = generateTokens(user._id as unknown as string, user.role as unknown as string);
  return { user, accessToken, refreshToken };
};

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('No account found with that email address');
  
  logger.info('User found');

  await OTPService.generateAndSendOTP(email, 'PASSWORD_RESET', user.firstName);
  return { message: 'A password reset code has been sent to your email.' };
};

export const resetPassword = async (email: string, code: string, newPassword: string, ipAddress: string) => {
  await OTPService.verifyOTP(email, code, 'PASSWORD_RESET');

  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  user.password = newPassword; // Will be hashed by pre-save hook
  await user.save();

  await AuditLog.create({
    user: user._id,
    action: 'RESET_PASSWORD',
    module: 'Auth',
    details: { email: user.email },
    ipAddress,
    status: 'Success'
  });

  return { message: 'Password has been successfully reset.' };
};

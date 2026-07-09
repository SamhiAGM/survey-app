import OTP from '../models/OTP';
import EmailService from './EmailService';
import { generateOTP } from '../utils/security';
import User from '../models/User';
import logger from '../utils/logger';

export class OTPService {
  private static MAX_ATTEMPTS = 5;
  private static MAX_RESENDS = 3;

  public async generateAndSendOTP(email: string, purpose: 'REGISTRATION' | 'LOGIN' | 'PASSWORD_RESET', userName: string = 'User'): Promise<void> {
    // Check if an OTP already exists and handles resends
    const existingOTP = await OTP.findOne({ email, purpose, isUsed: false });
    
    if (existingOTP) {
      if (existingOTP.resendCount >= OTPService.MAX_RESENDS) {
        throw new Error('Maximum resend attempts reached. Please try again later.');
      }
      
      // We still generate a new code for the resend
      const otpCode = generateOTP();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 1);

      existingOTP.code = otpCode; // Pre-save hook will hash this
      existingOTP.expiresAt = expiresAt;
      existingOTP.resendCount += 1;
      existingOTP.attempts = 0; // Reset verification attempts for the new code
      
      logger.info('OTP generated');
      await existingOTP.save();
      logger.info('OTP saved');

      await this.dispatchEmail(email, userName, otpCode, purpose);
      return;
    }

    // Generate new OTP
    const otpCode = generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 1);

    await OTP.create({
      email,
      code: otpCode,
      expiresAt,
      purpose
    });
    logger.info('OTP saved');

    await this.dispatchEmail(email, userName, otpCode, purpose);
  }

  public async verifyOTP(email: string, code: string, purpose: 'REGISTRATION' | 'LOGIN' | 'PASSWORD_RESET'): Promise<boolean> {
    const otpRecord = await OTP.findOne({ email, purpose, isUsed: false });
    
    if (!otpRecord) {
      throw new Error('No active OTP found. Please request a new one.');
    }

    if (otpRecord.attempts >= OTPService.MAX_ATTEMPTS) {
      // Lock out or delete
      otpRecord.isUsed = true;
      await otpRecord.save();
      
      // If password reset, we might want to lock account here based on requirement
      if (purpose === 'PASSWORD_RESET') {
         const user = await User.findOne({ email });
         if (user) {
             user.status = 'suspended';
             await user.save();
             throw new Error('Account locked due to excessive failed attempts. Contact support.');
         }
      }
      
      throw new Error('Maximum verification attempts reached. Please request a new code.');
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new Error('OTP has expired. Please request a new one.');
    }

    const isValid = await otpRecord.compareCode(code);
    
    if (!isValid) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      throw new Error('Invalid OTP code');
    }

    // Delete OTP after successful verification for security, or mark as used
    await OTP.deleteOne({ _id: otpRecord._id });
    return true;
  }

  private async dispatchEmail(email: string, name: string, otpCode: string, purpose: string) {
    let subject = 'Your One-Time Verification Code';
    if (purpose === 'REGISTRATION') {
      subject = 'Ministry of Health - Verify your registration';
    } else if (purpose === 'PASSWORD_RESET') {
      subject = 'Ministry of Health - Password Reset Code';
    }

    const html = EmailService.getOTPVerificationTemplate(name, otpCode);
    
    // Await the email send to catch errors and block the HTTP response on failure
    await EmailService.sendEmail({ to: email, subject, html });
  }
}

export default new OTPService();

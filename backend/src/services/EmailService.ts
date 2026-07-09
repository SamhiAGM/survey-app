import nodemailer from 'nodemailer';
import logger from '../utils/logger';
import dotenv from 'dotenv';

dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  private getTransporter(): nodemailer.Transporter {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }
    return this.transporter;
  }

  public async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const transporter = this.getTransporter();
      await transporter.verify();
      logger.info('SMTP connected');

      const mailOptions = {
        from: `"Field Supervision Survey Management System" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      };

      await transporter.sendMail(mailOptions);
      logger.info(`Email sent successfully to ${options.to}`);
      return true;
    } catch (error) {
      logger.error('Error sending email:', error);
      throw error;
    }
  }

  public getOTPVerificationTemplate(name: string, otpCode: string): string {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Account Verification</h2>
        <p>Dear ${name},</p>
        <p>Your One-Time Password (OTP) for account verification is:</p>
        <h3 style="font-size: 24px; letter-spacing: 2px;">${otpCode}</h3>
        <p>This code will expire in 1 minute.</p>
        <p>If you did not request this code, please ignore this email.</p>
      </div>
    `;
  }
}

export default new EmailService();

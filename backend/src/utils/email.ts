import nodemailer from 'nodemailer';
import logger from './logger'; // assuming logger exists, I'll create or use Winston if it doesn't

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Configured for ethereal (mock) or standard SMTP via env vars
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS, 
  },
});

export const sendEmail = async (options: EmailOptions) => {
  try {
    const mailOptions = {
      from: `"Ministry of Health" <${process.env.SMTP_FROM || 'noreply@health.gov'}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    
    // In dev environment, if using ethereal, log the URL to preview the email
    if (process.env.NODE_ENV === 'development' && process.env.SMTP_HOST === 'smtp.ethereal.email') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

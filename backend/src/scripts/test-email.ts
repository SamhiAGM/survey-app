import dotenv from 'dotenv';
import path from 'path';
import nodemailer from 'nodemailer';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function testEmail() {
  console.log('User:', process.env.EMAIL_USER);
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Field Supervision" <${process.env.EMAIL_USER}>`,
      to: 'jdmaster1948@gmail.com',
      subject: 'Test Email from Temporary Script',
      text: 'This is a test email to verify delivery.',
    });
    console.log('Email sent successfully!', info.messageId);
  } catch (error) {
    console.error('Email send failed:', error);
  }
}

testEmail();

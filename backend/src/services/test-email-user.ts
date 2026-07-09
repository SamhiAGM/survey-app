import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });

import EmailService from './EmailService';

const test = async () => {
  console.log('Sending test email to jdmaster1948@gmail.com...');
  const success = await EmailService.sendEmail({
    to: 'jdmaster1948@gmail.com',
    subject: 'Test Email from Survey App',
    html: '<h1>This is a test email</h1><p>Checking if emails arrive.</p>'
  });
  console.log('Success:', success);
  process.exit();
};

test();

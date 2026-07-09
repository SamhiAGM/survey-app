import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import OTPService from './OTPService';

const test = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Connected...');
    
    await OTPService.generateAndSendOTP('jdmaster1948@gmail.com', 'REGISTRATION', 'John');
    
    console.log('OTP successfully generated and email dispatched.');
    
    // Wait a bit to ensure email is sent since it's dispatched asynchronously
    setTimeout(() => {
      process.exit();
    }, 5000);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
test();

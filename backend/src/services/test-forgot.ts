import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import { forgotPassword } from './auth.service';

const testForgotPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Connected...');
    
    const result = await forgotPassword('jdmaster1948@gmail.com');
    console.log('Result:', result);
    
    // Give it 5 seconds to finish async email dispatch
    setTimeout(() => {
      process.exit();
    }, 5000);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};
testForgotPassword();

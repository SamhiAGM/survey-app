import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IOTP extends Document {
  email: string;
  mobileNumber?: string;
  code: string;
  expiresAt: Date;
  isUsed: boolean;
  purpose: 'REGISTRATION' | 'LOGIN' | 'PASSWORD_RESET';
  attempts: number;
  resendCount: number;
  createdAt: Date;
  compareCode: (candidateCode: string) => Promise<boolean>;
}

const OTPSchema: Schema = new Schema({
  email: { type: String, required: true },
  mobileNumber: { type: String },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  isUsed: { type: Boolean, default: false },
  purpose: { type: String, enum: ['REGISTRATION', 'LOGIN', 'PASSWORD_RESET'], required: true },
  attempts: { type: Number, default: 0 },
  resendCount: { type: Number, default: 0 }
}, { timestamps: { createdAt: true, updatedAt: false } });

OTPSchema.pre('save', async function() {
  if (!this.isModified('code') || !this.code) return;
  const salt = await bcrypt.genSalt(10);
  this.code = await bcrypt.hash(this.code as string, salt);
});

OTPSchema.methods.compareCode = async function(candidateCode: string) {
  if (!this.code) return false;
  return await bcrypt.compare(candidateCode, this.code as string);
};

// TTL index to automatically remove expired OTPs
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 300 }); // 5 minutes buffer after expiration

export default mongoose.model<IOTP>('OTP', OTPSchema);

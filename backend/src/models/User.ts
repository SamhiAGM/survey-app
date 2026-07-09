import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId: string;
  nic: string;
  passportNumber?: string;
  email: string;
  mobileNumber: string;
  alternativePhone?: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  
  province: string;
  district: string;
  mohDivision: string;
  facility: mongoose.Types.ObjectId;
  department: string;
  jobTitle: string;
  
  role: mongoose.Types.ObjectId;
  
  username: string;
  password?: string;
  securityQuestion: string;
  securityAnswer: string;
  
  profilePictureUrl?: string;
  digitalSignatureUrl?: string;
  
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
  receiveNotifications: boolean;
  
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  
  status: 'active' | 'inactive' | 'suspended' | 'pending_approval';
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  nic: { type: String, required: true, unique: true },
  passportNumber: { type: String },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true, unique: true },
  alternativePhone: { type: String },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  
  province: { type: String, required: true },
  district: { type: String, required: true },
  mohDivision: { type: String, required: true },
  facility: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
  department: { type: String, required: true },
  jobTitle: { type: String, required: true },
  
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  
  username: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
  
  profilePictureUrl: { type: String },
  digitalSignatureUrl: { type: String },
  
  termsAccepted: { type: Boolean, required: true },
  privacyPolicyAccepted: { type: Boolean, required: true },
  receiveNotifications: { type: Boolean, default: false },
  
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  
  status: { type: String, enum: ['active', 'inactive', 'suspended', 'pending_approval'], default: 'pending_approval' }
}, { timestamps: true });

UserSchema.pre('save', async function() {
  if (!this.isModified('password') || !this.password) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

// Hash security answer before save as well for security
UserSchema.pre('save', async function() {
  if (!this.isModified('securityAnswer') || !this.securityAnswer) return;
  const salt = await bcrypt.genSalt(10);
  this.securityAnswer = await bcrypt.hash(this.securityAnswer as string, salt);
});

UserSchema.methods.comparePassword = async function(candidatePassword: string) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password as string);
};

export default mongoose.model<IUser>('User', UserSchema);

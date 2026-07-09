import mongoose, { Schema, Document } from 'mongoose';

export interface IApiKey extends Document {
  name: string;
  keyPrefix: string;
  keyHash: string; // The hashed version of the key (we never store the raw key)
  createdBy: mongoose.Types.ObjectId;
  expiresAt?: Date;
  lastUsedAt?: Date;
  status: 'Active' | 'Revoked' | 'Expired';
}

const ApiKeySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  keyPrefix: {
    type: String,
    required: true // First 8 chars of the key for identification
  },
  keyHash: {
    type: String,
    required: true,
    select: false // Exclude from normal queries for security
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expiresAt: {
    type: Date
  },
  lastUsedAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Active', 'Revoked', 'Expired'],
    default: 'Active'
  }
}, { timestamps: true });

export default mongoose.model<IApiKey>('ApiKey', ApiKeySchema);

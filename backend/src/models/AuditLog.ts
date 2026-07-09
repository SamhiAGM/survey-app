import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  user: mongoose.Types.ObjectId;
  action: string;
  module: string;
  details: Record<string, any>;
  ipAddress?: string;
  status: 'Success' | 'Failed';
  createdAt: Date;
}

const AuditLogSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'EXPORT', 'CONFIG_CHANGE']
  },
  module: {
    type: String,
    required: true
  },
  details: {
    type: Schema.Types.Mixed,
    default: {}
  },
  ipAddress: {
    type: String
  },
  status: {
    type: String,
    enum: ['Success', 'Failed'],
    default: 'Success'
  }
}, { timestamps: { createdAt: true, updatedAt: false } });

// Index for fast filtering by module or date
AuditLogSchema.index({ module: 1, createdAt: -1 });
AuditLogSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);

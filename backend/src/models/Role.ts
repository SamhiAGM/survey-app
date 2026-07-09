import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: string; // e.g., 'Super Admin', 'Supervisor', 'Field Officer'
  permissions: string[];
}

const RoleSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String }] // Array of permission strings
}, { timestamps: true });

export default mongoose.model<IRole>('Role', RoleSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IFacility extends Document {
  name: string;
  type: string; // 'Hospital', 'Clinic', 'MOH Office'
  district: string; // Could be a ref to District model
  location: {
    type: string;
    coordinates: number[];
  };
}

const FacilitySchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  district: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  }
}, { timestamps: true });

FacilitySchema.index({ location: '2dsphere' });

export default mongoose.model<IFacility>('Facility', FacilitySchema);

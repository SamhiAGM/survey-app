import mongoose, { Schema, Document } from 'mongoose';

export interface IAnswer {
  questionId: mongoose.Types.ObjectId;
  value: any; // Could be string, number, array of strings, etc.
}

export interface ISurveyResponse extends Document {
  surveyTemplateId: mongoose.Types.ObjectId;
  workerId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;
  answers: IAnswer[];
  location?: { type: string, coordinates: number[] };
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedAt?: Date;
  supervisorComments?: string;
}

const AnswerSchema = new Schema<IAnswer>({
  questionId: { type: Schema.Types.ObjectId, required: true },
  value: { type: Schema.Types.Mixed, required: true }
});

const SurveyResponseSchema: Schema = new Schema({
  surveyTemplateId: { type: Schema.Types.ObjectId, ref: 'SurveyTemplate', required: true },
  workerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  facilityId: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
  answers: [AnswerSchema],
  location: {
    type: { type: String, enum: ['Point'] },
    coordinates: { type: [Number] }
  },
  status: { type: String, enum: ['draft', 'submitted', 'approved', 'rejected'], default: 'draft' },
  submittedAt: { type: Date },
  supervisorComments: { type: String }
}, { timestamps: true });

SurveyResponseSchema.index({ facilityId: 1, status: 1 });
SurveyResponseSchema.index({ location: '2dsphere' });

export default mongoose.model<ISurveyResponse>('SurveyResponse', SurveyResponseSchema);

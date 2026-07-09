import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion {
  questionText: string;
  type: 'Text' | 'Number' | 'Radio' | 'Checkbox' | 'FileUpload' | 'GPS';
  options?: string[];
  required: boolean;
}

export interface ISurveyTemplate extends Document {
  title: string;
  description?: string;
  category: string;
  questions: IQuestion[];
  createdBy: mongoose.Types.ObjectId;
  version: number;
}

const QuestionSchema = new Schema<IQuestion>({
  questionText: { type: String, required: true },
  type: { type: String, required: true },
  options: [{ type: String }],
  required: { type: Boolean, default: false }
});

const SurveyTemplateSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  questions: [QuestionSchema],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  version: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model<ISurveyTemplate>('SurveyTemplate', SurveyTemplateSchema);

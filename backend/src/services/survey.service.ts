import SurveyTemplate, { ISurveyTemplate } from '../models/SurveyTemplate';

export const createSurveyTemplate = async (data: any, userId: string) => {
  const survey = await SurveyTemplate.create({ ...data, createdBy: userId });
  return survey;
};

export const getSurveyTemplates = async () => {
  const surveys = await SurveyTemplate.find().populate('createdBy', 'name email');
  return surveys;
};

export const getSurveyTemplateById = async (id: string) => {
  const survey = await SurveyTemplate.findById(id).populate('createdBy', 'name email');
  return survey;
};

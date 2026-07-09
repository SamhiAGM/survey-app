import { Request, Response, NextFunction } from 'express';
import * as surveyService from '../services/survey.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createSurvey = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const survey = await surveyService.createSurveyTemplate(req.body, req.user._id);
    res.status(201).json({ success: true, data: survey });
  } catch (error) {
    next(error);
  }
};

export const getSurveys = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const surveys = await surveyService.getSurveyTemplates();
    res.status(200).json({ success: true, data: surveys });
  } catch (error) {
    next(error);
  }
};

export const getSurvey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const survey = await surveyService.getSurveyTemplateById(req.params.id as string);
    if (!survey) {
      res.status(404).json({ success: false, error: 'Survey not found' });
      return;
    }
    res.status(200).json({ success: true, data: survey });
  } catch (error) {
    next(error);
  }
};

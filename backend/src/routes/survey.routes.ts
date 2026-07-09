import { Router } from 'express';
import { createSurvey, getSurveys, getSurvey } from '../controllers/survey.controller';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Protect all survey routes
router.use(protect);

router.route('/')
  .get(getSurveys)
  .post(authorize('Super Admin', 'Ministry Admin', 'Supervisor'), createSurvey);

router.route('/:id')
  .get(getSurvey);

export default router;

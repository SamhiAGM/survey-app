import { Router } from 'express';
import {
  getFacilities,
  getFacility,
  createFacility,
  updateFacility,
  deleteFacility
} from '../controllers/facility.controller';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Protect all routes
router.use(protect);

router
  .route('/')
  .get(getFacilities)
  .post(authorize('Admin', 'Super Admin'), createFacility);

router
  .route('/:id')
  .get(getFacility)
  .put(authorize('Admin', 'Super Admin'), updateFacility)
  .delete(authorize('Super Admin'), deleteFacility);

export default router;

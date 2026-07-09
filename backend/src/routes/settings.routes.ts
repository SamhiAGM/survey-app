import { Router } from 'express';
import {
  getDatabaseStats,
  getAuditLogs,
  getApiKeys,
  createApiKey,
  revokeApiKey
} from '../controllers/settings.controller';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Settings should only be accessible by Super Admins
router.use(protect);
router.use(authorize('Super Admin'));

router.get('/database', getDatabaseStats);
router.get('/audit', getAuditLogs);

router
  .route('/keys')
  .get(getApiKeys)
  .post(createApiKey);

router.put('/keys/:id/revoke', revokeApiKey);

export default router;

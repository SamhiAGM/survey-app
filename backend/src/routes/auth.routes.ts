import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Example protected route for testing
router.get('/me', protect, (req, res) => {
  res.status(200).json({ success: true, data: (req as any).user });
});

export default router;

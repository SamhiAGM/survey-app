import { Router } from 'express';
import { register, login, logout, verifyOTP, resendOTP, checkAvailability, forgotPassword, resetPassword } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { authLimiter, otpLimiter } from '../middlewares/rateLimiter.middleware';
import { registerSchema, verifyOTPSchema, resendOTPSchema, forgotPasswordSchema, resetPasswordSchema } from '../validations/auth.validation';

const router = Router();

router.get('/check-availability', checkAvailability);
router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/verify-otp', otpLimiter, validate(verifyOTPSchema), verifyOTP);
router.post('/resend-otp', otpLimiter, validate(resendOTPSchema), resendOTP);
router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.post('/forgot-password', otpLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', otpLimiter, validate(resetPasswordSchema), resetPassword);

// Example protected route for testing
router.get('/me', protect, (req, res) => {
  res.status(200).json({ success: true, data: (req as any).user });
});

export default router;

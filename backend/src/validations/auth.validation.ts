import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    middleName: z.string().optional(),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    employeeId: z.string().min(3, 'Employee ID is required'),
    nic: z.string().regex(/^[0-9]{9}[vVxX]|[0-9]{12}$/, 'Invalid NIC format'),
    passportNumber: z.string().optional(),
    email: z.string().email('Invalid email format'),
    mobileNumber: z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid mobile number format'),
    alternativePhone: z.string().optional(),
    dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date format' }),
    gender: z.enum(['Male', 'Female', 'Other']),
    
    province: z.string().min(2, 'Province is required'),
    district: z.string().min(2, 'District is required'),
    mohDivision: z.string().min(2, 'MOH Division is required'),
    facility: z.string().min(2, 'Facility ID is required'), // This will be ObjectId string
    department: z.string().min(2, 'Department is required'),
    jobTitle: z.string().min(2, 'Job Title is required'),
    
    username: z.string().min(4, 'Username must be at least 4 characters'),
    password: z.string()
      .min(12, 'Password must be at least 12 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    
    securityQuestion: z.string().min(5, 'Security question is required'),
    securityAnswer: z.string().min(3, 'Security answer is required'),
    
    termsAccepted: z.boolean().refine((val) => val === true, { message: 'You must accept the Terms and Conditions' }),
    privacyPolicyAccepted: z.boolean().refine((val) => val === true, { message: 'You must accept the Privacy Policy' }),
    receiveNotifications: z.boolean().optional().default(false)
  })
});

export const verifyOTPSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    code: z.string().length(6, 'OTP must be exactly 6 digits')
  })
});

export const resendOTPSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format')
  })
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format')
  })
});

export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    code: z.string().length(6, 'OTP must be exactly 6 digits'),
    newPassword: z.string()
      .min(12, 'Password must be at least 12 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
  })
});

'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { registerSchema, RegisterFormValues } from '@/lib/validations/auth';
import { useRegisterStore } from '@/store/useRegisterStore';
import { Progress } from '@/components/ui/progress';
import api from '@/lib/api';

import Step1PersonalInfo from './steps/Step1PersonalInfo';
import Step2ContactInfo from './steps/Step2ContactInfo';
import Step3Organization from './steps/Step3Organization';
import Step4Security from './steps/Step4Security';
import OTPVerification from './OTPVerification';

const STEPS = [
  { id: 1, name: 'Personal' },
  { id: 2, name: 'Contact' },
  { id: 3, name: 'Organization' },
  { id: 4, name: 'Security' },
];

export default function RegisterForm() {
  const { step, nextStep, prevStep, formData, updateFormData, resetForm } = useRegisterStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema) as any,
    defaultValues: {
      ...formData,
      termsAccepted: formData.termsAccepted || false,
      privacyPolicyAccepted: formData.privacyPolicyAccepted || false,
      receiveNotifications: formData.receiveNotifications || false,
    } as any,
    mode: 'onTouched',
  });

  const { handleSubmit, trigger, getValues, watch } = methods;

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) {
      fieldsToValidate = ['firstName', 'middleName', 'lastName', 'employeeId', 'nic', 'passportNumber', 'dateOfBirth', 'gender'];
    } else if (step === 2) {
      fieldsToValidate = ['email', 'mobileNumber', 'alternativePhone', 'province', 'district'];
    } else if (step === 3) {
      fieldsToValidate = ['mohDivision', 'facility', 'department', 'jobTitle'];
    }

    const isValid = await trigger(fieldsToValidate as any);
    
    if (isValid) {
      updateFormData(getValues());
      nextStep();
    } else {
      toast.error('Please fix the errors before proceeding.');
    }
  };

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await api.post('/auth/register', data);
      
      toast.success(response.data.message || 'Registration successful');
      setRegisteredEmail(data.email);
      setShowOTP(true);
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showOTP) {
    return <OTPVerification email={registeredEmail} onSuccess={() => resetForm()} />;
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Create your account</h2>
        <p className="text-muted-foreground mt-2 text-sm">Join the enterprise system for healthcare professionals.</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
          {STEPS.map((s) => (
            <span key={s.id} className={step >= s.id ? 'text-primary' : ''}>
              {s.name}
            </span>
          ))}
        </div>
        <Progress value={(step / STEPS.length) * 100} className="h-2" />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && <Step1PersonalInfo />}
              {step === 2 && <Step2ContactInfo />}
              {step === 3 && <Step3Organization />}
              {step === 4 && <Step4Security />}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between pt-6 border-t border-border">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1 || isSubmitting}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
            >
              Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-md shadow hover:bg-primary/90 transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-md shadow hover:bg-primary/90 transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

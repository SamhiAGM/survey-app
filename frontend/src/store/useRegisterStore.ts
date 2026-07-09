import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RegisterFormValues } from '@/lib/validations/auth';

interface RegisterState {
  step: number;
  formData: Partial<RegisterFormValues>;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<RegisterFormValues>) => void;
  resetForm: () => void;
}

export const useRegisterStore = create<RegisterState>()(
  persist(
    (set) => ({
      step: 1,
      formData: {},
      setStep: (step) => set({ step }),
      nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 5) })),
      prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
      updateFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
      resetForm: () => set({ step: 1, formData: {} }),
    }),
    {
      name: 'register-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({ formData: state.formData, step: state.step }),
    }
  )
);

'use client';

import LeftPanel from '@/components/auth/LeftPanel';
import RegisterForm from '@/components/auth/RegisterForm';
import { Toaster } from 'sonner';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full bg-background selection:bg-primary/30">
      {/* Left Panel with Animation & Graphics */}
      <LeftPanel />

      {/* Right Panel with Registration Form */}
      <div className="flex w-full lg:w-[55%] flex-col justify-center items-center p-6 sm:p-12 relative">
        <div className="absolute top-8 right-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-primary hover:underline underline-offset-4">
              Sign in
            </a>
          </p>
        </div>
        
        <div className="w-full max-w-2xl mt-12">
          <RegisterForm />
        </div>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
}

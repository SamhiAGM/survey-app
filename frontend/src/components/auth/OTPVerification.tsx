import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Mail, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/lib/api';

interface OTPVerificationProps {
  email: string;
  onSuccess?: (code?: string) => void;
  purpose?: 'REGISTRATION' | 'PASSWORD_RESET';
}

export default function OTPVerification({ email, onSuccess, purpose = 'REGISTRATION' }: OTPVerificationProps) {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    // take only the last character if they typed multiple
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // move focus to next
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
      if (inputRefs.current[i]) {
        inputRefs.current[i]!.value = pastedData[i];
      }
    }
    setOtp(newOtp);
    
    // Focus the next empty input or the last one
    const focusIndex = pastedData.length < 6 ? pastedData.length : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    
    if (code.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    try {
      if (purpose === 'REGISTRATION') {
        await api.post('/auth/verify-otp', { email, code });
        toast.success('Email verified successfully!');
        
        if (onSuccess) {
          onSuccess();
        } else {
          router.push('/dashboard');
        }
      } else if (purpose === 'PASSWORD_RESET') {
        // Just verify, don't login or redirect yet, pass back to parent
        if (onSuccess) {
           onSuccess(code); // Pass code to parent to use for the actual reset request
        }
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || err.message || 'Verification failed');
      // Clear OTP on error
      setOtp(new Array(6).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      if (purpose === 'REGISTRATION') {
        await api.post('/auth/resend-otp', { email });
      } else {
        await api.post('/auth/forgot-password', { email });
      }
      
      toast.success('A new OTP has been sent to your email');
      setTimeLeft(60);
      setOtp(new Array(6).fill(''));
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      toast.error(err.response?.data?.error || err.message || 'Resend failed');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto text-center space-y-6 bg-card p-8 rounded-xl shadow-lg border border-border"
    >
      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Mail className="w-8 h-8 text-primary" />
      </div>
      
      <h2 className="text-2xl font-bold tracking-tight text-foreground">Check your email</h2>
      <p className="text-muted-foreground text-sm">
        We've sent a 6-digit verification code to <br/>
        <span className="font-semibold text-foreground">{email}</span>
      </p>

      <form onSubmit={handleVerify} className="space-y-8 mt-8">
        <div className="flex justify-center gap-2 sm:gap-4">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-lg border-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
            />
          ))}
        </div>

        <Button type="submit" className="w-full h-12 text-md" disabled={isVerifying || otp.join('').length !== 6 || timeLeft === 0}>
          {isVerifying ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <ShieldCheck className="w-5 h-5 mr-2" />
          )}
          Verify Code
        </Button>
      </form>

      <div className="pt-6 border-t border-border flex flex-col items-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Code expires in: <span className="font-mono font-medium text-foreground">{formatTime(timeLeft)}</span>
        </p>
        <button 
          onClick={handleResend}
          disabled={timeLeft > 0 || isResending} // Can only resend after it expires
          className="text-sm font-medium text-primary hover:underline disabled:opacity-50 disabled:hover:no-underline disabled:cursor-not-allowed"
        >
          {isResending ? 'Resending...' : 'Resend Code'}
        </button>
      </div>
    </motion.div>
  );
}

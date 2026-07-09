import { useFormContext } from 'react-hook-form';
import { RegisterFormValues } from '@/lib/validations/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function Step2ContactInfo() {
  const { register, formState: { errors }, watch, setError, clearErrors } = useFormContext<RegisterFormValues>();
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  
  const email = watch('email');

  useEffect(() => {
    const checkEmail = async () => {
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        try {
          const response = await api.get(`/auth/check-availability?field=email&value=${encodeURIComponent(email)}`);
          const data = response.data;
          setEmailAvailable(data.isAvailable);
          if (!data.isAvailable) {
            setError('email', { type: 'manual', message: 'Email is already taken' });
          } else {
            clearErrors('email');
          }
        } catch (err) {
          // Ignore
        }
      }
    };
    
    const timeout = setTimeout(checkEmail, 500);
    return () => clearTimeout(timeout);
  }, [email, setError, clearErrors]);

  return (
    <div className="space-y-6">
      <div className="space-y-2 relative">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="john.doe@health.gov.lk" {...register('email')} className={errors.email ? 'border-destructive' : ''} />
        {emailAvailable === true && !errors.email && (
          <span className="absolute right-3 top-9 text-xs text-emerald-500 font-medium">Available</span>
        )}
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input id="mobileNumber" placeholder="+94771234567" {...register('mobileNumber')} className={errors.mobileNumber ? 'border-destructive' : ''} />
          {errors.mobileNumber && <p className="text-xs text-destructive">{errors.mobileNumber.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="alternativePhone">Alternative Phone (Optional)</Label>
          <Input id="alternativePhone" placeholder="+94112345678" {...register('alternativePhone')} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="province">Province</Label>
          <Input id="province" placeholder="Western Province" {...register('province')} className={errors.province ? 'border-destructive' : ''} />
          {errors.province && <p className="text-xs text-destructive">{errors.province.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="district">District</Label>
          <Input id="district" placeholder="Colombo" {...register('district')} className={errors.district ? 'border-destructive' : ''} />
          {errors.district && <p className="text-xs text-destructive">{errors.district.message}</p>}
        </div>
      </div>
    </div>
  );
}

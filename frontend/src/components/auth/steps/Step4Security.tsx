import { useFormContext } from 'react-hook-form';
import { RegisterFormValues } from '@/lib/validations/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import PasswordStrengthMeter from '../PasswordStrengthMeter';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function Step4Security() {
  const { register, formState: { errors }, watch, setValue, setError, clearErrors } = useFormContext<RegisterFormValues>();
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  const password = watch('password');
  const username = watch('username');
  const termsAccepted = watch('termsAccepted');
  const privacyPolicyAccepted = watch('privacyPolicyAccepted');
  const receiveNotifications = watch('receiveNotifications');

  useEffect(() => {
    const checkUsername = async () => {
      if (username && username.length >= 4) {
        try {
          const response = await api.get(`/auth/check-availability?field=username&value=${encodeURIComponent(username)}`);
          const data = response.data;
          setUsernameAvailable(data.isAvailable);
          if (!data.isAvailable) {
            setError('username', { type: 'manual', message: 'Username is already taken' });
          } else {
            clearErrors('username');
          }
        } catch (err) {
          // Ignore
        }
      }
    };
    
    const timeout = setTimeout(checkUsername, 500);
    return () => clearTimeout(timeout);
  }, [username, setError, clearErrors]);

  return (
    <div className="space-y-6">
      <div className="space-y-2 relative">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="johndoe" {...register('username')} className={errors.username ? 'border-destructive' : ''} />
        {usernameAvailable === true && !errors.username && (
          <span className="absolute right-3 top-9 text-xs text-emerald-500 font-medium">Available</span>
        )}
        {errors.username && <p className="text-xs text-destructive">{errors.username.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register('password')} className={errors.password ? 'border-destructive' : ''} />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          <PasswordStrengthMeter password={password} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" {...register('confirmPassword')} className={errors.confirmPassword ? 'border-destructive' : ''} />
          {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="space-y-2">
          <Label htmlFor="securityQuestion">Security Question</Label>
          <Input id="securityQuestion" placeholder="What is your mother's maiden name?" {...register('securityQuestion')} className={errors.securityQuestion ? 'border-destructive' : ''} />
          {errors.securityQuestion && <p className="text-xs text-destructive">{errors.securityQuestion.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="securityAnswer">Security Answer</Label>
          <Input id="securityAnswer" placeholder="Answer" {...register('securityAnswer')} className={errors.securityAnswer ? 'border-destructive' : ''} />
          {errors.securityAnswer && <p className="text-xs text-destructive">{errors.securityAnswer.message}</p>}
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="termsAccepted" 
            checked={termsAccepted === true} 
            onCheckedChange={(checked) => setValue('termsAccepted', checked === true, { shouldValidate: true })} 
          />
          <div className="grid gap-1.5 leading-none">
            <label htmlFor="termsAccepted" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Accept terms and conditions
            </label>
            {errors.termsAccepted && <p className="text-xs text-destructive">{errors.termsAccepted.message}</p>}
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="privacyPolicyAccepted" 
            checked={privacyPolicyAccepted === true} 
            onCheckedChange={(checked) => setValue('privacyPolicyAccepted', checked === true, { shouldValidate: true })} 
          />
          <div className="grid gap-1.5 leading-none">
            <label htmlFor="privacyPolicyAccepted" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Accept privacy policy
            </label>
            {errors.privacyPolicyAccepted && <p className="text-xs text-destructive">{errors.privacyPolicyAccepted.message}</p>}
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="receiveNotifications" 
            checked={receiveNotifications === true} 
            onCheckedChange={(checked) => setValue('receiveNotifications', checked === true)} 
          />
          <div className="grid gap-1.5 leading-none">
            <label htmlFor="receiveNotifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Receive notifications via email and SMS
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

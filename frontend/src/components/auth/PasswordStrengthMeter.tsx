import { Progress } from '@/components/ui/progress';

export default function PasswordStrengthMeter({ password }: { password?: string }) {
  if (password === undefined) return null;

  const getStrength = (pass: string) => {
    let score = 0;
    if (!pass) return score;

    if (pass.length > 11) score += 1;
    if (pass.length > 15) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    return score; // Max 6
  };

  const score = getStrength(password);
  let value = (score / 6) * 100;
  
  let color = 'bg-red-500';
  let text = 'Very Weak';
  if (score > 2) { color = 'bg-yellow-500'; text = 'Weak'; }
  if (score > 3) { color = 'bg-blue-500'; text = 'Good'; }
  if (score > 4) { color = 'bg-emerald-500'; text = 'Strong'; }

  return (
    <div className="space-y-1 mt-2">
      <div className="flex justify-between text-xs">
        <span>Password strength</span>
        <span className={color.replace('bg-', 'text-')}>{text}</span>
      </div>
      <Progress value={value} className={`h-1.5 ${color}`} />
      <ul className="text-xs text-muted-foreground grid grid-cols-2 gap-1 mt-2">
        <li className={password.length >= 12 ? 'text-emerald-500' : ''}>✓ Min 12 chars</li>
        <li className={/[A-Z]/.test(password) ? 'text-emerald-500' : ''}>✓ Uppercase</li>
        <li className={/[a-z]/.test(password) ? 'text-emerald-500' : ''}>✓ Lowercase</li>
        <li className={/[0-9]/.test(password) ? 'text-emerald-500' : ''}>✓ Number</li>
        <li className={/[^A-Za-z0-9]/.test(password) ? 'text-emerald-500' : ''}>✓ Special char</li>
      </ul>
    </div>
  );
}

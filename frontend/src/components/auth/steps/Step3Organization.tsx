import { useFormContext } from 'react-hook-form';
import { RegisterFormValues } from '@/lib/validations/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Step3Organization() {
  const { register, formState: { errors }, setValue, watch } = useFormContext<RegisterFormValues>();
  const [facilities, setFacilities] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, fetch facilities from /api/v1/facilities
    // Mocking for now to avoid blocking the UI
    setFacilities([
      { _id: '64f8c1234567890abcdef123', name: 'National Hospital Colombo' },
      { _id: '64f8c1234567890abcdef124', name: 'Kandy Teaching Hospital' },
      { _id: '64f8c1234567890abcdef125', name: 'Galle General Hospital' },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mohDivision">MOH Division</Label>
          <Input id="mohDivision" placeholder="Colombo Municipal Council" {...register('mohDivision')} className={errors.mohDivision ? 'border-destructive' : ''} />
          {errors.mohDivision && <p className="text-xs text-destructive">{errors.mohDivision.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="facility">Primary Facility</Label>
          <Select onValueChange={(val: any) => setValue('facility', val)} value={watch('facility') || ""}>
            <SelectTrigger className={errors.facility ? 'border-destructive' : ''}>
              <SelectValue placeholder="Select Facility">
                {watch('facility') ? facilities.find(f => f._id === watch('facility'))?.name || watch('facility') : undefined}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {facilities.map(f => (
                <SelectItem key={f._id} value={f._id}>{f.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.facility && <p className="text-xs text-destructive">{errors.facility.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input id="department" placeholder="Public Health" {...register('department')} className={errors.department ? 'border-destructive' : ''} />
          {errors.department && <p className="text-xs text-destructive">{errors.department.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input id="jobTitle" placeholder="Field Officer" {...register('jobTitle')} className={errors.jobTitle ? 'border-destructive' : ''} />
          {errors.jobTitle && <p className="text-xs text-destructive">{errors.jobTitle.message}</p>}
        </div>
      </div>
    </div>
  );
}

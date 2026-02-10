import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useGgpaCalculator } from '../useGgpaCalculator';
import type { Subject, Grade } from '../types';
import { GRADE_OPTIONS } from '../types';
import { SubjectIcon } from '../icons';

interface SubjectRowProps {
  subject: Subject;
  semesterId: string;
  subjectNumber: number;
}

export default function SubjectRow({ subject, semesterId, subjectNumber }: SubjectRowProps) {
  const { updateSubjectCredits, updateSubjectGrade, removeSubject } = useGgpaCalculator();

  return (
    <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border border-slate-200 hover:border-teal-200 transition-colors duration-200">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <SubjectIcon className="h-5 w-5 text-teal-600 flex-shrink-0 mt-6" />
        
        <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Credits Input */}
          <div className="space-y-1.5">
            <Label htmlFor={`credits-${subject.id}`} className="text-sm font-medium text-foreground">
              Credits
            </Label>
            <Input
              id={`credits-${subject.id}`}
              type="number"
              min="0"
              step="0.5"
              placeholder="e.g., 3"
              value={subject.credits}
              onChange={(e) => updateSubjectCredits(semesterId, subject.id, e.target.value)}
              className="border-slate-300 focus:border-teal-400 focus:ring-teal-400 transition-colors"
            />
          </div>

          {/* Grade Select */}
          <div className="space-y-1.5">
            <Label htmlFor={`grade-${subject.id}`} className="text-sm font-medium text-foreground">
              Grade
            </Label>
            <Select
              value={subject.grade}
              onValueChange={(value) => updateSubjectGrade(semesterId, subject.id, value as Grade)}
            >
              <SelectTrigger
                id={`grade-${subject.id}`}
                className="border-slate-300 focus:border-teal-400 focus:ring-teal-400 transition-colors"
              >
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {GRADE_OPTIONS.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <Button
        onClick={() => removeSubject(semesterId, subject.id)}
        variant="ghost"
        size="icon"
        className="flex-shrink-0 mt-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

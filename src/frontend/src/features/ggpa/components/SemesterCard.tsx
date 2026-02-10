import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useGgpaCalculator } from '../useGgpaCalculator';
import type { Semester } from '../types';
import SubjectRow from './SubjectRow';
import { SemesterIcon } from '../icons';
import { formatGgpa } from '../ggpaMath';

interface SemesterCardProps {
  semester: Semester;
}

export default function SemesterCard({ semester }: SemesterCardProps) {
  const { addSubject, removeSemester, getSemesterSgpa } = useGgpaCalculator();
  const sgpaResult = getSemesterSgpa(semester.id);

  return (
    <Card className="border-teal-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-teal-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SemesterIcon className="h-6 w-6 text-teal-600" />
            <CardTitle className="text-xl font-semibold text-foreground">
              Semester {semester.number}
            </CardTitle>
          </div>
          <div className="flex items-center gap-4">
            {sgpaResult.isValid && (
              <div className="text-sm">
                <span className="text-muted-foreground">SGPA: </span>
                <span className="font-bold text-teal-700 text-lg">{formatGgpa(sgpaResult.sgpa)}</span>
              </div>
            )}
            <Button
              onClick={() => removeSemester(semester.id)}
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {/* Subjects */}
        <div className="space-y-3">
          {semester.subjects.map((subject, index) => (
            <SubjectRow
              key={subject.id}
              subject={subject}
              semesterId={semester.id}
              subjectNumber={index + 1}
            />
          ))}
        </div>

        {/* Validation Message */}
        {!sgpaResult.isValid && sgpaResult.errorMessage && (
          <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            {sgpaResult.errorMessage}
          </div>
        )}

        {/* Add Subject Button */}
        <Button
          onClick={() => addSubject(semester.id)}
          variant="outline"
          size="sm"
          className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 transition-all duration-200"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Subject
        </Button>
      </CardContent>
    </Card>
  );
}

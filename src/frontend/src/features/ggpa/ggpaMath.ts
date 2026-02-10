import type { Grade, Subject, Semester } from './types';

export function gradeToPoints(grade: Grade | ''): number {
  switch (grade) {
    case 'O':
      return 10;
    case 'A+':
      return 9;
    case 'A':
      return 8;
    case 'B+':
      return 7;
    case 'B':
      return 6;
    case 'C':
      return 5;
    case 'U / Fail':
      return 0;
    default:
      return 0;
  }
}

export interface SgpaResult {
  sgpa: number;
  isValid: boolean;
  errorMessage?: string;
}

export function calculateSgpa(subjects: Subject[]): SgpaResult {
  if (subjects.length === 0) {
    return { sgpa: 0, isValid: false, errorMessage: 'Add at least one subject' };
  }

  let totalCredits = 0;
  let totalPoints = 0;

  for (const subject of subjects) {
    const credits = parseFloat(subject.credits);
    
    if (!subject.credits || isNaN(credits) || credits <= 0) {
      return { sgpa: 0, isValid: false, errorMessage: 'Enter valid credits for all subjects' };
    }

    if (!subject.grade) {
      return { sgpa: 0, isValid: false, errorMessage: 'Select grade for all subjects' };
    }

    const gradePoints = gradeToPoints(subject.grade);
    totalCredits += credits;
    totalPoints += credits * gradePoints;
  }

  if (totalCredits === 0) {
    return { sgpa: 0, isValid: false, errorMessage: 'Total credits must be greater than 0' };
  }

  const sgpa = totalPoints / totalCredits;
  return { sgpa, isValid: true };
}

export interface GgpaResult {
  ggpa: number;
  isValid: boolean;
  errorMessage?: string;
}

export function calculateGgpa(semesters: Semester[]): GgpaResult {
  if (semesters.length === 0) {
    return { ggpa: 0, isValid: false, errorMessage: 'Add at least one semester' };
  }

  const sgpaResults = semesters.map((semester) => calculateSgpa(semester.subjects));
  
  const invalidSemester = sgpaResults.find((result) => !result.isValid);
  if (invalidSemester) {
    return { ggpa: 0, isValid: false, errorMessage: invalidSemester.errorMessage };
  }

  const totalSgpa = sgpaResults.reduce((sum, result) => sum + result.sgpa, 0);
  const ggpa = totalSgpa / semesters.length;

  return { ggpa, isValid: true };
}

export function formatGgpa(ggpa: number): string {
  return ggpa.toFixed(2);
}

export function getPerformanceMessage(ggpa: number): string {
  if (ggpa >= 9) {
    return 'Excellent 🌟';
  } else if (ggpa >= 8) {
    return 'Very Good 👍';
  } else if (ggpa >= 7) {
    return 'Good 🙂';
  } else {
    return 'Needs Improvement 💪';
  }
}

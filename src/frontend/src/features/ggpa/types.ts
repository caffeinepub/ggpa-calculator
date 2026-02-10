export type Grade = 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'U / Fail';

export const GRADE_OPTIONS: Grade[] = ['O', 'A+', 'A', 'B+', 'B', 'C', 'U / Fail'];

export interface Subject {
  id: string;
  credits: string;
  grade: Grade | '';
}

export interface Semester {
  id: string;
  number: number;
  subjects: Subject[];
}

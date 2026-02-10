import { create } from 'zustand';
import type { Semester, Subject, Grade } from './types';
import { calculateSgpa, calculateGgpa } from './ggpaMath';
import type { GgpaResult } from './ggpaMath';

interface GgpaCalculatorState {
  semesters: Semester[];
  calculated: boolean;
  lastCalculatedResult: GgpaResult | null;
  addSemester: () => void;
  removeSemester: (semesterId: string) => void;
  addSubject: (semesterId: string) => void;
  removeSubject: (semesterId: string, subjectId: string) => void;
  updateSubjectCredits: (semesterId: string, subjectId: string, credits: string) => void;
  updateSubjectGrade: (semesterId: string, subjectId: string, grade: Grade | '') => void;
  getSemesterSgpa: (semesterId: string) => ReturnType<typeof calculateSgpa>;
  getGgpa: () => ReturnType<typeof calculateGgpa>;
  calculate: () => void;
  resetCalculation: () => void;
}

let semesterCounter = 1;
let subjectCounter = 1;

function createNewSubject(): Subject {
  return {
    id: `subject-${subjectCounter++}`,
    credits: '',
    grade: '',
  };
}

function createNewSemester(): Semester {
  return {
    id: `semester-${semesterCounter++}`,
    number: semesterCounter - 1,
    subjects: [createNewSubject()],
  };
}

export const useGgpaCalculator = create<GgpaCalculatorState>((set, get) => ({
  semesters: [createNewSemester()],
  calculated: false,
  lastCalculatedResult: null,

  addSemester: () => {
    set((state) => ({
      semesters: [...state.semesters, createNewSemester()],
      calculated: false,
      lastCalculatedResult: null,
    }));
  },

  removeSemester: (semesterId: string) => {
    set((state) => {
      const newSemesters = state.semesters.filter((s) => s.id !== semesterId);
      // Ensure at least one semester remains
      if (newSemesters.length === 0) {
        return { 
          semesters: [createNewSemester()],
          calculated: false,
          lastCalculatedResult: null,
        };
      }
      // Renumber semesters
      return {
        semesters: newSemesters.map((s, index) => ({ ...s, number: index + 1 })),
        calculated: false,
        lastCalculatedResult: null,
      };
    });
  },

  addSubject: (semesterId: string) => {
    set((state) => ({
      semesters: state.semesters.map((semester) =>
        semester.id === semesterId
          ? { ...semester, subjects: [...semester.subjects, createNewSubject()] }
          : semester
      ),
      calculated: false,
      lastCalculatedResult: null,
    }));
  },

  removeSubject: (semesterId: string, subjectId: string) => {
    set((state) => ({
      semesters: state.semesters.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              subjects:
                semester.subjects.length > 1
                  ? semester.subjects.filter((s) => s.id !== subjectId)
                  : semester.subjects,
            }
          : semester
      ),
      calculated: false,
      lastCalculatedResult: null,
    }));
  },

  updateSubjectCredits: (semesterId: string, subjectId: string, credits: string) => {
    set((state) => ({
      semesters: state.semesters.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              subjects: semester.subjects.map((subject) =>
                subject.id === subjectId ? { ...subject, credits } : subject
              ),
            }
          : semester
      ),
      calculated: false,
      lastCalculatedResult: null,
    }));
  },

  updateSubjectGrade: (semesterId: string, subjectId: string, grade: Grade | '') => {
    set((state) => ({
      semesters: state.semesters.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              subjects: semester.subjects.map((subject) =>
                subject.id === subjectId ? { ...subject, grade } : subject
              ),
            }
          : semester
      ),
      calculated: false,
      lastCalculatedResult: null,
    }));
  },

  getSemesterSgpa: (semesterId: string) => {
    const semester = get().semesters.find((s) => s.id === semesterId);
    if (!semester) {
      return { sgpa: 0, isValid: false, errorMessage: 'Semester not found' };
    }
    return calculateSgpa(semester.subjects);
  },

  getGgpa: () => {
    return calculateGgpa(get().semesters);
  },

  calculate: () => {
    const result = calculateGgpa(get().semesters);
    set({
      calculated: true,
      lastCalculatedResult: result,
    });
  },

  resetCalculation: () => {
    set({
      calculated: false,
      lastCalculatedResult: null,
    });
  },
}));

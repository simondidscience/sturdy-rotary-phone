import { create } from 'zustand';
import { Assignment, DailyStats } from '../types';

interface AssignmentStore {
  assignments: Assignment[];
  addAssignment: (assignment: Assignment) => void;
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  completeAssignment: (id: string) => void;
  getAssignmentsByDate: (date: Date) => Assignment[];
  getAssignmentsBySubject: (subject: string) => Assignment[];
  getOverdueAssignments: () => Assignment[];
}

export const useAssignmentStore = create<AssignmentStore>((set, get) => ({
  assignments: [],
  addAssignment: (assignment) => set((state) => ({ assignments: [...state.assignments, assignment], })),
  updateAssignment: (id, updates) => set((state) => ({ assignments: state.assignments.map((a) => a.id === id ? { ...a, ...updates } : a ), })),
  deleteAssignment: (id) => set((state) => ({ assignments: state.assignments.filter((a) => a.id !== id), })),
  completeAssignment: (id) => set((state) => ({ assignments: state.assignments.map((a) => a.id === id ? { ...a, status: 'completed', completedAt: new Date() } : a ), })),
  getAssignmentsByDate: (date) => {
    const dateStr = date.toDateString();
    return get().assignments.filter(
      (a) => new Date(a.deadline).toDateString() === dateStr
    );
  },
  getAssignmentsBySubject: (subject) => get().assignments.filter((a) => a.subject === subject),
  getOverdueAssignments: () => get().assignments.filter(
    (a) => a.status !== 'completed' && new Date(a.deadline) < new Date()
  ),
}));
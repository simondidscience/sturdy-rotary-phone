export interface Assignment {
  id: string;
  title: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics';
  description?: string;
  deadline: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  completedAt?: Date;
  estimatedHours: number;
  tags?: string[];
}

export interface DailyStats {
  date: Date;
  totalAssignments: number;
  completedAssignments: number;
  completionRate: number;
  hoursSpent: number;
}

export interface WeeklyStats {
  weekStart: Date;
  weekEnd: Date;
  dailyStats: DailyStats[];
  totalCompletionRate: number;
  subjectWiseBreakdown: Record<string, number>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  preferences: {
    theme: 'light' | 'dark';
    notificationsEnabled: boolean;
  };
}
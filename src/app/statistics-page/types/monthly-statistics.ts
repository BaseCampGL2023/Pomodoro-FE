import { Month } from './month';

export interface MonthlyStatistics {
  userId: string;
  year: number;
  month: Month;
  pomodorosDone: number;
  tasksCompleted: number;
  timeSpent: number;
}

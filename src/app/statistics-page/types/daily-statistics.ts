import { AnalyticsPerHour } from './analytics-per-hour';

export interface DailyStatistics {
  userId: string;
  day: Date;
  analyticsPerHours: Array<AnalyticsPerHour>;
}

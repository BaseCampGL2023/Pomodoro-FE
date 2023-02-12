import { AnalyticsPerMonth } from './analytics-per-month';

export interface AnnualStatistics {
  userId: string;
  year: number;
  analyticsPerMonths: Array<AnalyticsPerMonth>;
}

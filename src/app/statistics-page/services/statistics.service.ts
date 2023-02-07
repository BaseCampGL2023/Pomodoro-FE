import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnnualStatistics } from '../types/annual-statistics';
import { DailyStatistics } from '../types/daily-statistics';
import { Month } from '../types/month';
import { MonthlyStatistics } from '../types/monthly-statistics';

@Injectable()
export class StatisticsService {
  public getDailyStatistics(): Observable<DailyStatistics> {
    return new Observable((observer) => {
      observer.next({
        userId: 'guid',
        day: new Date('2021/05/08'),
        analyticsPerHours: [
          {
            hour: 0,
            pomodorosDone: 1,
            timeSpent: 1512,
          },
          {
            hour: 2,
            pomodorosDone: 2,
            timeSpent: 3005,
          },
          {
            hour: 4,
            pomodorosDone: 1,
            timeSpent: 1410,
          },
          {
            hour: 6,
            pomodorosDone: 2,
            timeSpent: 3050,
          },
          {
            hour: 8,
            pomodorosDone: 3,
            timeSpent: 4100,
          },
          {
            hour: 10,
            pomodorosDone: 4,
            timeSpent: 6050,
          },
          {
            hour: 12,
            pomodorosDone: 1,
            timeSpent: 1200,
          },
          {
            hour: 14,
            pomodorosDone: 2,
            timeSpent: 2900,
          },
          {
            hour: 16,
            pomodorosDone: 1,
            timeSpent: 1220,
          },
          {
            hour: 18,
            pomodorosDone: 1,
            timeSpent: 1503,
          },
          {
            hour: 20,
            pomodorosDone: 2,
            timeSpent: 3020,
          },
          {
            hour: 22,
            pomodorosDone: 1,
            timeSpent: 1500,
          },
        ],
      });
    });
  }

  public getAnnualStatistics(): Observable<AnnualStatistics> {
    return new Observable((observer) => {
      observer.next({
        userId: 'guid',
        year: 2021,
        analyticsPerMonths: [
          {
            month: Month.Jan,
            pomodorosDone: 10,
          },
          {
            month: Month.Feb,
            pomodorosDone: 20,
          },
          {
            month: Month.Mar,
            pomodorosDone: 50,
          },
          {
            month: Month.Apr,
            pomodorosDone: 100,
          },
          {
            month: Month.May,
            pomodorosDone: 90,
          },
          {
            month: Month.Jun,
            pomodorosDone: 75,
          },
          {
            month: Month.Jul,
            pomodorosDone: 85,
          },
          {
            month: Month.Aug,
            pomodorosDone: 45,
          },
          {
            month: Month.Sep,
            pomodorosDone: 35,
          },
          {
            month: Month.Oct,
            pomodorosDone: 40,
          },
          {
            month: Month.Nov,
            pomodorosDone: 15,
          },
          {
            month: Month.Dec,
            pomodorosDone: 5,
          },
        ],
      });
    });
  }

  public getMonthlyStatistics(): Observable<MonthlyStatistics> {
    return new Observable((observer) => {
      observer.next({
        userId: 'guid',
        year: 2021,
        month: Month.May,
        pomodorosDone: 120,
        tasksCompleted: 55,
        timeSpent: 183_450,
      });
    });
  }
}

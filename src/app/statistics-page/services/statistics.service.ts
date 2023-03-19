import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnnualStatistics } from '../types/annual-statistics';
import { DailyStatistics } from '../types/daily-statistics';
import { MonthlyStatistics } from '../types/monthly-statistics';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  private readonly statisticsUrl = environment.baseUrl + 'statistics';

  getDailyStatistics(date: Date): Observable<DailyStatistics> {
    const url = `${this.statisticsUrl}/daily/${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    return this.http
      .get<DailyStatistics>(url)
      .pipe(catchError(this.handleError));
  }

  getMonthlyStatistics(
    year: number,
    month: number
  ): Observable<MonthlyStatistics> {
    const url = `${this.statisticsUrl}/monthly/${year}/${month + 1}`;
    return this.http
      .get<MonthlyStatistics>(url)
      .pipe(catchError(this.handleError));
  }

  getAnnualStatistics(year: number): Observable<AnnualStatistics> {
    const url = `${this.statisticsUrl}/annual/${year}`;
    return this.http
      .get<AnnualStatistics>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error));
  }
}

import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import { MonthlyStatistics } from '../../types/monthly-statistics';
import { secondsToHmsFormat } from '../../utils/time-utils';

@Component({
  selector: 'app-monthly-statistics',
  templateUrl: './monthly-statistics.component.html',
  styleUrls: ['./monthly-statistics.component.scss'],
})
export class MonthlyStatisticsComponent implements OnInit {
  constructor(private statisticsService: StatisticsService) {}

  monthlyStatistics?: MonthlyStatistics;

  ngOnInit(): void {
    this.statisticsService
      .getMonthlyStatistics()
      .subscribe((result) => (this.monthlyStatistics = result));
  }

  get timeSpent(): string {
    return this.monthlyStatistics == null
      ? '00:00'
      : secondsToHmsFormat(this.monthlyStatistics.timeSpent);
  }
}

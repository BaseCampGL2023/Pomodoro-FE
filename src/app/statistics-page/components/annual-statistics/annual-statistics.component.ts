import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import { AnnualStatistics } from '../../types/annual-statistics';
import { Month } from '../../types/month';

@Component({
  selector: 'app-annual-statistics',
  templateUrl: './annual-statistics.component.html',
  styleUrls: ['./annual-statistics.component.scss'],
})
export class AnnualStatisticsComponent implements OnInit {
  constructor(private statisticsService: StatisticsService) {}

  annualStatistics?: AnnualStatistics;

  Month = Month;

  pomodoroTimesAxis: number[] = [100, 75, 50, 25, 0];

  ngOnInit(): void {
    this.statisticsService
      .getAnnualStatistics()
      .subscribe((result) => (this.annualStatistics = result));
  }

  calcBarHeight(pomodorosDone: number): number {
    return (pomodorosDone / this.pomodoroTimesAxis[0]) * 100;
  }
}

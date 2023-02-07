import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import { DailyStatistics } from '../../types/daily-statistics';
import { secondsToMsFormat } from '../../utils/time-utils';

@Component({
  selector: 'app-daily-statistics',
  templateUrl: './daily-statistics.component.html',
  styleUrls: ['./daily-statistics.component.scss'],
})
export class DailyStatisticsComponent implements OnInit {
  constructor(private statisticsService: StatisticsService) {}

  dailyStatistics?: DailyStatistics;

  pomodoroTimesAxis: number[] = [4, 3, 2, 1, 0];

  ngOnInit(): void {
    this.statisticsService
      .getDailyStatistics()
      .subscribe((result) => (this.dailyStatistics = result));
  }

  calcBarHeight(pomodorosDone: number): number {
    return (pomodorosDone / this.pomodoroTimesAxis[0]) * 100;
  }

  formatTime(seconds: number): string {
    return secondsToMsFormat(seconds);
  }
}

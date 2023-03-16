import { Component, Input } from '@angular/core';
import { MonthlyStatistics } from '../../types/monthly-statistics';
import { secondsToHmsFormat } from '../../utils/time-utils';

@Component({
  selector: 'app-monthly-statistics',
  templateUrl: './monthly-statistics.component.html',
  styleUrls: ['./monthly-statistics.component.scss'],
})
export class MonthlyStatisticsComponent {
  @Input() statistics?: MonthlyStatistics;

  get timeSpent(): string {
    return this.statistics == null
      ? '00:00'
      : secondsToHmsFormat(this.statistics.timeSpent);
  }
}

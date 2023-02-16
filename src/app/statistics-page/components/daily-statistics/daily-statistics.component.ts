import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { TaskService } from 'src/app/shared-module/services/task.service';
import { StatisticsService } from '../../services/statistics.service';
import { DailyStatistics } from '../../types/daily-statistics';
import { secondsToMsFormat } from '../../utils/time-utils';

@Component({
  selector: 'app-daily-statistics',
  templateUrl: './daily-statistics.component.html',
  styleUrls: ['./daily-statistics.component.scss'],
})
export class DailyStatisticsComponent implements OnInit {
  @ViewChild('picker') datePicker?: MatDatepicker<Date>;

  private _selectedDay: Date = new Date();
  get selectedDay(): Date {
    return this._selectedDay;
  }
  set selectedDay(value: Date) {
    this._selectedDay = value;
    this.taskService.getTasksOnDate(value);
  }

  maxDate: Date;
  dailyStatistics?: DailyStatistics;
  pomodoroTimesAxis: number[];

  constructor(
    private statisticsService: StatisticsService,
    private taskService: TaskService
  ) {
    this.maxDate = new Date();
    this.maxDate.setHours(0, 0, 0, 0);

    this.pomodoroTimesAxis = [4, 3, 2, 1, 0];
  }

  get dateInputRightArrowState(): string {
    return this.selectedDay < this.maxDate ? 'active' : 'unactive';
  }

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

  openDatePicker() {
    this.datePicker?.open();
  }

  dateInputLeftArrowClick() {
    const currDate = this.selectedDay.getDate();
    this.selectedDay = new Date(
      this.selectedDay.getFullYear(),
      this.selectedDay.getMonth(),
      currDate - 1
    );
  }

  dateInputRightArrowClick() {
    if (this.selectedDay < this.maxDate) {
      const currDate = this.selectedDay.getDate();
      this.selectedDay = new Date(
        this.selectedDay.getFullYear(),
        this.selectedDay.getMonth(),
        currDate + 1
      );
    }
  }
}

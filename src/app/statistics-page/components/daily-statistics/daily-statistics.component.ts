import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  BarPlotUnitVM,
  BarPlotVM,
} from 'src/app/shared-module/bar-plot/bar-plot-vm';
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

  maxDate: Date;
  barPlotVM = new BarPlotVM('Pomodoro (times)', 'Hour', 'Time spent');
  statisticsNotFound = false;

  constructor(
    private statisticsService: StatisticsService
  ) {
    this.maxDate = new Date();
    this.maxDate.setHours(0, 0, 0, 0);
  }

  private _selectedDay: Date = new Date();

  get selectedDay(): Date {
    return this._selectedDay;
  }

  set selectedDay(value: Date) {
    this._selectedDay = value;
    this.loadDailyStatistics();
  }

  get dateInputRightArrowState(): string {
    return this.selectedDay < this.maxDate ? 'active' : 'unactive';
  }

  ngOnInit(): void {
    this.loadDailyStatistics();
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

  private loadDailyStatistics(): void {
    this.statisticsService
      .getDailyStatistics(this._selectedDay)
      .subscribe((result) => {
        if (result) {
          this.updateBarPlotVM(result);
          this.statisticsNotFound = this.barPlotVM.isEmpty();
        }
      });
  }

  private updateBarPlotVM(data: DailyStatistics) {
    if (this.barPlotVM.dataSequence.length > 0) {
      this.barPlotVM.dataSequence.splice(0, this.barPlotVM.dataSequence.length);
    }

    data.analyticsPerHours.forEach((aph) => {
      this.barPlotVM.dataSequence.push(
        new BarPlotUnitVM(
          aph.hour.toString(),
          aph.pomodorosDone,
          this.formatTime(aph.timeSpent)
        )
      );
    });
  }
}

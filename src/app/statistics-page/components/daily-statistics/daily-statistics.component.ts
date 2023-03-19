import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  @Output() dateSelectedEvent = new EventEmitter<Date>();

  maxDate: Date;
  barPlotVM = new BarPlotVM('Pomodoro (times)', 'Hour', 'Time spent');
  statisticsNotFound = false;

  constructor(private statisticsService: StatisticsService) {
    this.maxDate = new Date();
    this.maxDate.setHours(0, 0, 0, 0);
  }

  private readonly dailyStatisticsXAxis = [
    '0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22'
  ];

  private _selectedDay: Date = new Date();

  get selectedDay(): Date {
    return this._selectedDay;
  }

  set selectedDay(value: Date) {
    this._selectedDay = value;
    this.loadDailyStatistics();
    this.dateSelectedEvent.emit(value);
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
      .subscribe((result) => this.updateBarPlotVM(result));
  }

  private updateBarPlotVM(data: DailyStatistics) {
    this.barPlotVM.clearData();
    this.statisticsNotFound =
      data.analyticsPerHours.length === 0;

    if (this.statisticsNotFound) {
      this.barPlotVM.addDefaultData(this.dailyStatisticsXAxis);
      return;
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

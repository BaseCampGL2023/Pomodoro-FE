import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  BarPlotUnitVM,
  BarPlotVM,
} from 'src/app/shared-module/bar-plot/bar-plot-vm';
import { StatisticsService } from '../../services/statistics.service';
import { AnnualStatistics } from '../../types/annual-statistics';
import { Month } from '../../types/month';

@Component({
  selector: 'app-annual-statistics',
  templateUrl: './annual-statistics.component.html',
  styleUrls: ['./annual-statistics.component.scss'],
})
export class AnnualStatisticsComponent implements OnInit {
  @ViewChild('picker') datePicker?: MatDatepicker<Date>;
  @Output() monthSelectedEvent = new EventEmitter<Date>();

  maxDate: Date;
  Month = Month;

  barPlotVM = new BarPlotVM('Pomodoro (times)', 'Month', 'Overall');

  constructor(private statisticsService: StatisticsService) {
    this.maxDate = new Date();
    this.maxDate.setDate(1);
    this.maxDate.setHours(0, 0, 0, 0);
  }

  private _selectedMonth = new Date();

  get selectedMonth(): Date {
    return this._selectedMonth;
  }

  set selectedMonth(value: Date) {
    this._selectedMonth = value;
    this.loadAnnualStatistics();
    this.monthSelectedEvent.emit(this.selectedMonth);
  }

  get dateInputRightArrowState(): string {
    return this.selectedMonth < this.maxDate ? 'active' : 'unactive';
  }

  ngOnInit(): void {
    this.loadAnnualStatistics();
  }

  openDatePicker() {
    this.datePicker?.open();
  }

  monthSelected(value: Date, picker: MatDatepicker<Date>) {
    this.selectedMonth = value;
    picker.close();
  }

  dateInputLeftArrowClick() {
    const currMonth = this.selectedMonth.getMonth();
    this.selectedMonth = new Date(
      this.selectedMonth.getFullYear(),
      currMonth - 1
    );
  }

  dateInputRightArrowClick() {
    if (this.selectedMonth < this.maxDate) {
      const currMonth = this.selectedMonth.getMonth();
      this.selectedMonth = new Date(
        this.selectedMonth.getFullYear(),
        currMonth + 1
      );
    }
  }

  private loadAnnualStatistics() {
    this.statisticsService
      .getAnnualStatistics(this._selectedMonth.getFullYear())
      .subscribe((result) => {
        if (result) {
          console.log(result);
          this.updateBarPlotVM(result);
        }
      });
  }

  private updateBarPlotVM(data: AnnualStatistics) {
    if (this.barPlotVM.dataSequence.length > 0) {
      this.barPlotVM.dataSequence.splice(0, this.barPlotVM.dataSequence.length);
    }

    data.analyticsPerMonths.forEach((apm) => {
      this.barPlotVM.dataSequence.push(
        new BarPlotUnitVM(
          `${Month[apm.month]}`,
          apm.pomodorosDone,
          `${apm.pomodorosDone} times`
        )
      );
    });
  }
}

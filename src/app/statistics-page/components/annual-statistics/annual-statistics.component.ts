import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { BarPlotUnitVM, BarPlotVM } from 'src/app/shared-module/bar-plot/bar-plot-vm';
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

  maxDate: Date;
  selectedMonth: Date;

  annualStatistics?: AnnualStatistics;
  Month = Month;
  pomodoroTimesAxis: number[];

  barPlotVM = new BarPlotVM("Pomodoro (times)", "Overall");

  constructor(private statisticsService: StatisticsService) {
    this.maxDate = new Date();
    this.maxDate.setDate(1);
    this.maxDate.setHours(0, 0, 0, 0);

    this.selectedMonth = new Date();

    this.pomodoroTimesAxis = [100, 75, 50, 25, 0];
  }

  get dateInputRightArrowState(): string {
    return this.selectedMonth < this.maxDate ? 'active' : 'unactive';
  }

  ngOnInit(): void {
    this.statisticsService
      .getAnnualStatistics()
      .subscribe((result) => (this.annualStatistics = result));

      this.annualStatistics?.analyticsPerMonths.forEach(apm => {
        this.barPlotVM.dataSequence.push(
          new BarPlotUnitVM(
            apm.month.toString(),
            apm.pomodorosDone,
            `${apm.pomodorosDone} times`
          )
        );
      });
  }

  calcBarHeight(pomodorosDone: number): number {
    return (pomodorosDone / this.pomodoroTimesAxis[0]) * 100;
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
}

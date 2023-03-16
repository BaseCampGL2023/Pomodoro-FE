import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared-module/services/task.service';
import { TaskForList } from 'src/app/shared-module/types/task-for-list';
import { StatisticsService } from '../../services/statistics.service';
import { MonthlyStatistics } from '../../types/monthly-statistics';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
})
export class StatisticsPageComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private statisticsService: StatisticsService
  ) {}

  taskList: TaskForList[] = [];
  monthlyStatistics?: MonthlyStatistics;

  ngOnInit() {
    this.loadTasks(new Date());
    this.loadMonthlyStatistics(new Date());
  }

  dateOnSelect(date: Date) {
    this.loadTasks(date);
  }

  monthOnSelect(month: Date) {
    this.loadMonthlyStatistics(month);
  }

  private loadMonthlyStatistics(date: Date): void {
    this.statisticsService
      .getMonthlyStatistics(date.getFullYear(), date.getMonth())
      .subscribe(res => {
        if (res) {
          this.monthlyStatistics = res;
        }
      });
  }

  private loadTasks(date: Date): void {
    this.taskService
      .getTasksOnDate(date)
      .subscribe((tasks) => (this.taskList = tasks));
  }
}

import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared-module/services/task.service';
import { Task } from 'src/app/shared-module/types/task';
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

  taskList: Task[] = [];
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
      .subscribe((res) => {
        if (res) {
          this.monthlyStatistics = res;
        }
      });
  }

  private loadTasks(date: Date): void {
    this.taskService.getCompletedTasksOnDate(date).subscribe({
      next: (tasks: Task[]) => (this.taskList = tasks),
      error: (err: Error) =>
        console.log('Error on statistics page: ', err.message),
    });
  }
}

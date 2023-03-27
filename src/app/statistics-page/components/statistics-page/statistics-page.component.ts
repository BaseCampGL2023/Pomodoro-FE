import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared-module/services/task.service';
import { Task } from 'src/app/shared-module/types/task';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
})
export class StatisticsPageComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  taskList: Task[] = [];

  ngOnInit() {
    this.taskService.getCompletedTasksOnDate(new Date()).subscribe({
      next: (tasks: Task[]) => (this.taskList = tasks),
      error: (err: Error) =>
        console.log('Error on statistics page: ', err.message),
    });
  }
}

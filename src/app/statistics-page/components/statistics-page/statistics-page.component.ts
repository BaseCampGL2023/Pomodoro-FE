import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared-module/services/task.service';
import { TaskForList } from 'src/app/shared-module/types/task-for-list';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
})
export class StatisticsPageComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  taskList: TaskForList[] = [];

  ngOnInit() {
    this.taskService
      .getCompletedTasksOnDate(new Date())
      .subscribe((tasks) => (this.taskList = tasks));
  }
}

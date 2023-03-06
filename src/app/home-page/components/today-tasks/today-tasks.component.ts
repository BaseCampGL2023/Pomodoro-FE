import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../shared-module/services/task.service';
import { TaskForList } from '../../../shared-module/types/task-for-list';

@Component({
  selector: 'app-today-tasks',
  templateUrl: './today-tasks.component.html',
  styleUrls: ['./today-tasks.component.scss'],
})
export class TodayTasksComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  taskList: TaskForList[] = [];

  ngOnInit() {
    this.taskService
      .getTodayTasks()
      .subscribe((tasks) => (this.taskList = this.moveDoneTaskToEnd(tasks)));
  }

  moveDoneTaskToEnd(arr: TaskForList[]) {
    const notDone = arr.filter((task) => task.progress !== 100);
    const done = arr.filter((task) => task.progress === 100);
    return notDone.concat(done);
  }
}

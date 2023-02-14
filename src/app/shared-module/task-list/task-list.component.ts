import { Component, Input } from '@angular/core';
import { Task } from '../types/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {

  @Input() tasks: Task[] = [];

  initionalCountOfTasksForShow = 3;

  isShowAllTasks = false; 

  getTotalAllocatedTime() {
    return this.tasks
      .map((task) => task.allocatedTime)
      .reduce((sum, curr) => sum + curr);
  }
}

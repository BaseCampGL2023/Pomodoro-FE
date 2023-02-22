import { Component, Input } from '@angular/core';
import { Task } from '../types/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() isSelectable = false;

  initionalCountOfTasksForShow = 3;

  isShowAllTasks = false;

  selectedTask: Task | null = null;

  selectTask(task: Task) {
    if (this.selectedTask == null || this.selectedTask != task) {
      this.selectedTask = task;
    } else {
      this.selectedTask = null;
    }
  }

  getTotalAllocatedTime() {
    return this.tasks
      .map((task) => task.allocatedTime)
      .reduce((sum, curr) => sum + curr);
  }
}

import { Component, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TaskForList } from '../types/task-for-list';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks: TaskForList[] = [];
  @Input() isSelectable = false;

  constructor(private taskService: TaskService) {}

  initionalCountOfTasksForShow = 3;

  isShowAllTasks = false;

  selectedTaskId: string | null = null;

  setTaskId(taskId: string) {
    if (this.selectedTaskId == null || this.selectedTaskId != taskId) {
      this.selectedTaskId = taskId;
    } else {
      this.selectedTaskId = null;
    }
    this.taskService.setCurTaskId(this.selectedTaskId);
  }

  getTotalAllocatedTime() {
    return this.tasks
      .map((task) => task.allocatedTime)
      .reduce((sum, curr) => sum + curr);
  }
}

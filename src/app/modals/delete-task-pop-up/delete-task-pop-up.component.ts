import { Component } from '@angular/core';
import { TaskService } from 'src/app/shared-module/services/task.service';

@Component({
  selector: 'app-delete-task-pop-up',
  templateUrl: './delete-task-pop-up.component.html',
  styleUrls: [
    './delete-task-pop-up.component.scss',
    '../complete-task-pop-up/complete-task-pop-up.component.scss',
  ],
})
export class DeleteTaskPopUpComponent {
  deleteTaskResult?: any;

  constructor(private taskService: TaskService) {}

  onSubmit() {
    // TODO
    this.taskService.deleteCurrentTask().subscribe({
      error: (error) => {
        if (!error?.error?.success) {
          this.deleteTaskResult = error.error;
        }
      },
    });
  }
}

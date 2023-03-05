import { Component } from '@angular/core';
import { TaskService } from 'src/app/shared-module/services/task.service';

@Component({
  selector: 'app-complete-task-pop-up',
  templateUrl: './complete-task-pop-up.component.html',
  styleUrls: ['./complete-task-pop-up.component.scss'],
})
export class CompleteTaskPopUpComponent {
  completeTaskResult?: any;

  constructor(private taskService: TaskService) {}

  onSubmit() {
    // TODO
    this.taskService.completeCurrentTask().subscribe({
      error: (error) => {
        if (!error?.error?.success) {
          this.completeTaskResult = error.error;
        }
      },
    });
  }
}

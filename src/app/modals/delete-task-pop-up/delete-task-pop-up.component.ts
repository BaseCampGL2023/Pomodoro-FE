import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  deleteTaskError?: string;

  constructor(private taskService: TaskService, private dialogRef: MatDialog) {}

  onSubmit() {
    this.taskService.deleteCurrentTask().subscribe({
      next: () => {
        this.dialogRef.closeAll();
      },
      error: (error) => {
        this.deleteTaskError = error;
      },
    });
  }
}

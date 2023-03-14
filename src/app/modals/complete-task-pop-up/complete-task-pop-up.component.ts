import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared-module/services/task.service';

@Component({
  selector: 'app-complete-task-pop-up',
  templateUrl: './complete-task-pop-up.component.html',
  styleUrls: ['./complete-task-pop-up.component.scss'],
})
export class CompleteTaskPopUpComponent {
  completeTaskError?: string;

  constructor(private taskService: TaskService, private dialogRef: MatDialog) {}

  onSubmit() {
    this.taskService.completeCurrentTask().subscribe({
      next: () => {
        this.dialogRef.closeAll();
      },
      error: (error) => {
        this.completeTaskError = error;
      },
    });
  }
}

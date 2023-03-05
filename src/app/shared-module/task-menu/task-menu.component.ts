import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskPopUpComponent } from 'src/app/modals/edit-task-pop-up/edit-task-pop-up.component';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.scss'],
})
export class TaskMenuComponent {
  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  onEditTask() {
    this.dialog.closeAll();
    this.dialog.open(EditTaskPopUpComponent);
  }
}

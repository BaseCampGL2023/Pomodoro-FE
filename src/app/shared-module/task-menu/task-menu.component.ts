import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompleteTaskPopUpComponent } from 'src/app/modals/complete-task-pop-up/complete-task-pop-up.component';
import { DeleteTaskPopUpComponent } from 'src/app/modals/delete-task-pop-up/delete-task-pop-up.component';
import { EditTaskPopUpComponent } from 'src/app/modals/edit-task-pop-up/edit-task-pop-up.component';

@Component({
  selector: 'app-task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.scss'],
})
export class TaskMenuComponent {
  constructor(private dialog: MatDialog) {}

  onEditTask() {
    this.dialog.closeAll();
    this.dialog.open(EditTaskPopUpComponent);
  }

  onCompleteTask() {
    this.dialog.closeAll();
    this.dialog.open(CompleteTaskPopUpComponent);
  }

  onDeleteTask() {
    this.dialog.closeAll();
    this.dialog.open(DeleteTaskPopUpComponent);
  }
}

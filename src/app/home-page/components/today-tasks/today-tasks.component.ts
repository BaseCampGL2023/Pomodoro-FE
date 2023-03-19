import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskPopUpComponent } from 'src/app/modals/create-task-pop-up/create-task-pop-up.component';
import { TaskService } from '../../../shared-module/services/task.service';
import { TaskForList } from '../../../shared-module/types/task-for-list';

@Component({
  selector: 'app-today-tasks',
  templateUrl: './today-tasks.component.html',
  styleUrls: ['./today-tasks.component.scss'],
})
export class TodayTasksComponent implements OnInit {
  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  taskList: TaskForList[] = [];

  ngOnInit() {
    this.taskService
      .getTasksOnDate(new Date())
      .subscribe((tasks) => (this.taskList = this.moveDoneTaskToEnd(tasks)));
  }

  onCreateTask() {
    this.dialog.closeAll();
    this.dialog.open(CreateTaskPopUpComponent);
  }

  moveDoneTaskToEnd(arr: TaskForList[]) {
    const notDone = arr.filter((task) => task.progress !== 100);
    const done = arr.filter((task) => task.progress === 100);
    return notDone.concat(done);
  }
}

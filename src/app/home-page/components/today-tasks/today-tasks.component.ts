import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskPopUpComponent } from 'src/app/modals/create-task-pop-up/create-task-pop-up.component';
import { Task } from 'src/app/shared-module/types/task';
import { TaskService } from '../../../shared-module/services/task.service';

@Component({
  selector: 'app-today-tasks',
  templateUrl: './today-tasks.component.html',
  styleUrls: ['./today-tasks.component.scss'],
})
export class TodayTasksComponent implements OnInit {
  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  taskList: Task[] = [];

  ngOnInit() {
    this.taskService.taskListChanged.subscribe(
      (tasks) => (this.taskList = this.moveDoneTaskToEnd(tasks))
    );
  }

  onCreateTask() {
    this.dialog.closeAll();
    this.dialog.open(CreateTaskPopUpComponent);
  }

  moveDoneTaskToEnd(arr: Task[]) {
    const notDone = arr.filter((task) => task.progress !== 100);
    const done = arr.filter((task) => task.progress === 100);
    return notDone.concat(done);
  }
}

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../shared-module/services/task.service';
import { Task } from '../../../shared-module/types/task';

@Component({
  selector: 'app-today-tasks',
  templateUrl: './today-tasks.component.html',
  styleUrls: ['./today-tasks.component.scss']
})
export class TodayTasksComponent implements OnInit {
  constructor(private taskService: TaskService) { }
  
  taskList: Task[] = [];

  ngOnInit() {
    this.taskService
      .getTasks()
      .subscribe((tasks) => (this.taskList = this.moveDoneTaskToEnd(tasks)));
  }
  
  moveDoneTaskToEnd(arr: Task[]) {
    const notDone = arr.filter((task) => task.progress !== 100);
    const done = arr.filter((task) => task.progress === 100);
    return notDone.concat(done);
  }
}

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../types/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  initionalCountOfTasksForShow = 3;

  isShowAllTasks = false;

  taskList: Task[] = [];

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => this.taskList = tasks);
  }

  getTotalAllocatedTime() {
    return this.taskList
      .map((task) => task.allocatedTime)
      .reduce((sum, curr) => sum + curr);
  }
}

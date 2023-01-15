import { Component } from '@angular/core';
import { Task } from '../../types/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  initionalCountOfTasksForShow: number = 3;

  isShowAllTasks: boolean = false;
  
  taskList: Task[] = [];

ngOnInit(){
    this.taskList = [
    { title: 'task1', frequency: 'dayly', allocatedTime: 100, progress: 50},
    { title: 'task2', frequency: '', allocatedTime: 350, progress: 10},
    { title: 'task3', frequency: 'mounthly', allocatedTime: 30, progress: 25},
    { title: 'task4', frequency: 'dayly', allocatedTime: 150, progress: 100}, 
    { title: 'task5', frequency: 'dayly', allocatedTime: 110, progress: 75},
  ];
}

  showAllTasks() {
    this.isShowAllTasks = !this.isShowAllTasks;
  }
  
  getTotalAllocatedTime() {
    return this.taskList.map(task => task.allocatedTime).reduce((sum, curr) => sum + curr);
  }
}

import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/home-page/services/task.service';
import { Task } from 'src/app/home-page/types/task';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
})
export class StatisticsPageComponent implements OnInit {
  constructor(private taskService: TaskService) { }
  
  taskList: Task[] = [];

  ngOnInit() {
    this.taskService
      .getTasks()
      .subscribe((tasks) => (this.taskList = tasks));
  }
}

import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared-module/services/task.service';
import { Task } from 'src/app/shared-module/types/task';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
})
export class StatisticsPageComponent implements OnInit {
  constructor(private taskService: TaskService) { }
  
  taskList: Task[] = [];

  selectedDateForTaskList: Date = new Date();

  ngOnInit() {
    this.taskService
      .getTasks()
      .subscribe((tasks) => (this.taskList = tasks));
  }

  setSelectedDate(selectedDate: Date) {
    this.selectedDateForTaskList = selectedDate;
  }
}

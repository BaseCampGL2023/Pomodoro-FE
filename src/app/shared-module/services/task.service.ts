import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../types/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTodayTasks(): Observable<Task[]> {
    return of(this.getTasks());
  }

  getTasksOnDate(date: Date): Observable<Task[]> {
    return of(this.getTasks());
  }

  private getTasks(): Task[] {
    return [
      {
        title: 'task1',
        frequency: 'dayly',
        allocatedTime: 1000,
        progress: 50,
      },
      { title: 'task2', frequency: '', allocatedTime: 600, progress: 10 },
      {
        title: 'task3',
        frequency: 'mounthly',
        allocatedTime: 30,
        progress: 25,
      },
      {
        title: 'task4',
        frequency: 'dayly',
        allocatedTime: 1500,
        progress: 100,
      },
      {
        title: 'task5',
        frequency: 'dayly',
        allocatedTime: 1100,
        progress: 60,
      },
      {
        title: 'task6',
        frequency: 'dayly',
        allocatedTime: 1100,
        progress: 100,
      },
      {
        title: 'task7',
        frequency: 'dayly',
        allocatedTime: 1100,
        progress: 35,
      },
      {
        title: 'task8',
        frequency: 'dayly',
        allocatedTime: 1600,
        progress: 40,
      },
      {
        title: 'task9',
        frequency: 'dayly',
        allocatedTime: 1100,
        progress: 55,
      },
      {
        title: 'task10',
        frequency: 'dayly',
        allocatedTime: 1100,
        progress: 80,
      },
      {
        title: 'task11',
        frequency: 'dayly',
        allocatedTime: 1100,
        progress: 95,
      },
    ];
  }
}

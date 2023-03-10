import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../types/task';
import { environment } from '../../../environments/environment';
import { TaskResult } from '../types/task-result';
import { TaskFrequenciesEnum } from '../enums/task-frequencies.enum';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTodayTasks(): Observable<Task[]> {
    const todayDate = new Date('2023-02-01');
    return this.getTasksOnDate(todayDate);
  }

  getTasksOnDate(date: Date): Observable<Task[]> {
    const url =
      environment.baseUrl +
      'Tasks/ByDate' +
      '?startdate=' +
      this.formatDate(date);
    return this.http.get<TaskResult[]>(url).pipe(
      map((data) => {
        return data.map((taskRes) => ({
          allocatedTime: taskRes.allocatedTime,
          frequency:
            Object.keys(TaskFrequenciesEnum)[
              taskRes.frequencyData.frequencyTypeValue
            ],
          progress: 20,
          title: taskRes.title,
        }));
      })
    );
  }

  formatDate(date: Date): string {
    const year = '' + date.getFullYear();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return year + '-' + month + '-' + day;
  }
}

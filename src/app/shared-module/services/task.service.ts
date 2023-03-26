import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap, throwError } from 'rxjs';
import { TrackerService } from '../tracker/tracker.service';
import { TrackerDurationEnum } from '../tracker/types/tracker-duration.enum';
import { TaskFrequenciesEnum } from '../enums/task-frequencies.enum';
import { TrackerEvent } from '../tracker/types/tracker-event';
import { TrackerEventEnum } from '../tracker/types/tracker-event.enum';
import { Task } from '../types/task';
import { TaskForList } from '../types/task-for-list';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { Pomodoro } from '../types/pomodoro';
import { TrackerSettingsService } from '../tracker/tracker-settings.service';
import { Guid } from '../types/guid';
import { Frequency } from '../types/frequency';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(
    private http: HttpClient,
    private trackerService: TrackerService,
    private settings: TrackerSettingsService,
    private datePipe: DatePipe
  ) {
    this.trackerService.event.subscribe((trackerEvent: TrackerEvent) => {
      if (
        trackerEvent.duration == TrackerDurationEnum.pomodoro &&
        trackerEvent.eventType == TrackerEventEnum.finish
      ) {
        this.addPomodoro();
      }
    });
  }

  private curTaskId: string | null = null;
  private lastPomodoroId: string | null = null;

  setCurTaskId(taskId: string | null) {
    if (this.curTaskId == taskId) {
      return;
    }
    this.curTaskId = taskId;
    this.trackerService.reload();
  }

  addPomodoro() {
    if (this.curTaskId === null) {
      console.log(`error when adding pomodoro: task wasn't set`);
      return;
    }

    const pomodoro: Pomodoro = {
      id: '',
      taskId: this.curTaskId,
      actuallDate:
        this.datePipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") ??
        '',
      timeSpent: this.settings.pomodoro,
    };

    const url = environment.baseUrl + 'tasks/' + this.curTaskId + '/pomodoros';

    this.http
      .post<string>(url, pomodoro)
      .pipe(
        catchError(async (error) => {
          console.log('error when adding pomodoro: ' + error.message);
          return '';
        })
      )
      .subscribe((pomodoroId) => {
        if (pomodoroId !== '') {
          this.lastPomodoroId = pomodoroId;
        }
      });
  }

  completeCurrentTask(): Observable<any> {
    const url =
      environment.baseUrl +
      'tasks/' +
      this.curTaskId +
      '/pomodoros/' +
      this.lastPomodoroId;
    return this.http.put<any>(url, null).pipe(catchError(this.handleError));
  }

  createTask(task: Task): Observable<any> {
    const url = environment.baseUrl + 'tasks';
    return this.http.post<any>(url, task).pipe(catchError(this.handleError));
  }

  updateTask(task: Task): Observable<any> {
    const url = environment.baseUrl + 'tasks/' + this.curTaskId;
    return this.http.put<any>(url, task).pipe(catchError(this.handleError));
  }

  deleteCurrentTask(): Observable<any> {
    const url = environment.baseUrl + 'tasks/' + this.curTaskId;
    return this.http.delete<any>(url).pipe(catchError(this.handleError));
  }

  getCurrentTask(): Observable<Task> {
    const url = environment.baseUrl + 'tasks/getById/' + this.curTaskId;
    return this.http.get<Task>(url).pipe(catchError(this.handleError));
  }

  getTasksOnDate(date: Date): Observable<TaskForList[]> {
    let dateString = this.datePipe.transform(date, 'yyyy-MM-dd');
    const url = environment.baseUrl + 'tasks/getByDate/' + dateString;
    return this.http.get<TaskForList[]>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () => new Error(error.message || 'something went wrong!')
    );
  }

  private getTasks(): TaskForList[] {
    return [
      {
        id: '1',
        title: 'task1',
        frequency: 'Day',
        allocatedTime: 1000,
        progress: 50,
      },
      {
        id: '2',
        title: 'task2',
        frequency: 'Week',
        allocatedTime: 600,
        progress: 10,
      },
      {
        id: '3',
        title: 'task3',
        frequency: 'Month',
        allocatedTime: 30,
        progress: 25,
      },
      {
        id: '4',
        title: 'task4',
        frequency: 'Day',
        allocatedTime: 1500,
        progress: 100,
      },
      {
        id: '5',
        title: 'task5',
        frequency: 'Day',
        allocatedTime: 1100,
        progress: 60,
      },
      {
        id: '6',
        title: 'task6',
        frequency: 'Day',
        allocatedTime: 1100,
        progress: 100,
      },
      {
        id: '7',
        title: 'task7',
        frequency: 'Day',
        allocatedTime: 1100,
        progress: 35,
      },
      {
        id: '8',
        title: 'task8',
        frequency: 'Day',
        allocatedTime: 1600,
        progress: 40,
      },
      {
        id: '9',
        title: 'task9',
        frequency: 'Day',
        allocatedTime: 1100,
        progress: 55,
      },
      {
        id: '10',
        title: 'task10',
        frequency: 'Day',
        allocatedTime: 1100,
        progress: 80,
      },
      {
        id: '11',
        title: 'task11',
        frequency: 'Day',
        allocatedTime: 1100,
        progress: 95,
      },
    ];
  }

  private getTask(): Task {
    return {
      id: '11',
      title: 'task11',
      frequency: {
        id: '145',
        frequencyType: TaskFrequenciesEnum.Day,
        every: 1,
        isCustom: false,
      },
      allocatedTime: 1100,
      initialDate: new Date(2023, 1, 20),
    };
  }
}

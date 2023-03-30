import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { TrackerService } from '../tracker/tracker.service';
import { TrackerDurationEnum } from '../tracker/types/tracker-duration.enum';
import { TrackerEvent } from '../tracker/types/tracker-event';
import { TrackerEventEnum } from '../tracker/types/tracker-event.enum';
import { Task } from '../types/task';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { Pomodoro } from '../types/pomodoro';
import { TrackerSettingsService } from '../tracker/tracker-settings.service';
import { TaskFrequenciesEnum } from '../enums/task-frequencies.enum';

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
    this.getTasksOnDate(new Date()).subscribe({
      next: (tasks: Task[]) => {
        this.todayTaskList = tasks;
        this.changeTodayTaskList();
      },
      error: (error: Error) => {
        console.log('Error occurred while getting tasks: ' + error.message);
      },
    });
  }

  private curTaskId: string | null = null;
  private todayTaskList: Task[] = [];
  private taskListSource = new BehaviorSubject<Task[]>(this.todayTaskList);
  taskListChanged = this.taskListSource.asObservable();

  changeTodayTaskList() {
    this.taskListSource.next(this.todayTaskList);
  }

  setCurTaskId(taskId: string | null) {
    if (this.curTaskId == taskId) {
      return;
    }
    this.curTaskId = taskId;
    this.trackerService.reload();
  }

  addPomodoro(): void {
    if (this.curTaskId === null) {
      console.log('You must do at least one pomodoro!');
    }

    const pomodoro: Pomodoro = {
      id: '00000000-0000-0000-0000-000000000000',
      taskId: this.curTaskId
        ? this.curTaskId
        : '00000000-0000-0000-0000-000000000000',
      actuallDate: new Date().toISOString(),
      timeSpent: this.settings.pomodoro * 60,
      isDone: false,
    };

    const url = environment.baseUrl + 'tasks/pomodoros';
    this.http.post<Task>(url, pomodoro).subscribe({
      next: (task: Task) => {
        this.todayTaskList.forEach((t, i) => {
          if (t.id == task.id) {
            this.todayTaskList[i].progress = task.progress;
          }
        });
        this.changeTodayTaskList();
        this.trackerService.reload();
      },
      error: (error: Error) => {
        console.log('Error occurred while adding pomodoro: ' + error.message);
      },
    });
  }

  completeCurrentTask(): Observable<any> {
    if (this.curTaskId === null) {
      return throwError(() => new Error('Task was not set!'));
    }
    const taskIndex = this.todayTaskList.findIndex(
      (t) => t.id === this.curTaskId
    );
    if (this.todayTaskList[taskIndex].progress === 0) {
      return throwError(() => new Error('You must do at least one pomodoro!'));
    } else {
      const url =
        environment.baseUrl + 'tasks/' + this.curTaskId + '/completeTask';
      return this.http.put<any>(url, null).pipe(
        map(() => {
          this.todayTaskList.forEach((t, i) => {
            if (t.id === this.curTaskId) {
              this.todayTaskList[i].progress = 100;
            }
          });
          this.trackerService.reload();
        }),
        catchError(this.handleError)
      );
    }
  }

  createTask(task: Task): Observable<any> {
    const url = environment.baseUrl + 'tasks';
    return this.http.post<Task>(url, task).pipe(
      map((newTask: Task) => {
        if (this.isTaskForToday(newTask)) {
          this.todayTaskList.push(this.setFrequencyValueForTask(newTask));
        }
      }),
      catchError(this.handleError)
    );
  }

  updateTask(task: Task): Observable<any> {
    if (this.curTaskId === null) {
      return throwError(() => new Error('Task was not set!'));
    }
    const url = environment.baseUrl + 'tasks/' + this.curTaskId;
    return this.http.put<Task>(url, task).pipe(
      map((updatedTask: Task) => {
        this.todayTaskList.forEach((t, i) => {
          if (t.id === updatedTask.id) {
            if (this.isTaskForToday(updatedTask)) {
              this.todayTaskList[i] =
                this.setFrequencyValueForTask(updatedTask);
            } else {
              this.todayTaskList.splice(i, 1);
            }
          }
        });
      }),
      catchError(this.handleError)
    );
  }

  deleteCurrentTask(): Observable<any> {
    if (this.curTaskId === null) {
      return throwError(() => new Error('Task was not set!'));
    }
    const url = environment.baseUrl + 'tasks/' + this.curTaskId;
    return this.http.delete<any>(url).pipe(
      map(() => {
        this.todayTaskList = [...this.todayTaskList].filter((t) => {
          return t.id !== this.curTaskId;
        });
        this.curTaskId = null;
        this.trackerService.reload();
      }),
      catchError(this.handleError)
    );
  }

  getCurrentTask(): Task | undefined {
    return this.todayTaskList.find((t) => t.id === this.curTaskId);
  }

  getTasksOnDate(date: Date): Observable<Task[]> {
    const dateString = this.datePipe.transform(date, 'yyyy-MM-dd');
    const url = environment.baseUrl + 'tasks/getByDate/' + dateString;
    return this.http.get<Task[]>(url).pipe(
      map((tasks) =>
        tasks.map((t) => {
          return this.setFrequencyValueForTask(t);
        })
      ),
      catchError(this.handleError)
    );
  }

  getCompletedTasksOnDate(date: Date): Observable<Task[]> {
    const dateString = this.datePipe.transform(date, 'yyyy-MM-dd');
    const url = environment.baseUrl + 'tasks/getCompletedByDate/' + dateString;
    return this.http.get<Task[]>(url).pipe(catchError(this.handleError));
  }

  private setFrequencyValueForTask(task: Task): Task {
    const freqValue = (TaskFrequenciesEnum as any)[
      task.frequency.frequencyValue
    ];
    task.frequency.frequencyValue = freqValue;
    return task;
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () => new Error(error.message || 'something went wrong!')
    );
  }

  private isTaskForToday(task: Task): boolean {
    const taskDate = new Date(task.initialDate);
    const today = new Date();
    if (
      taskDate.getFullYear() >= today.getFullYear() &&
      taskDate.getMonth() >= today.getMonth() &&
      taskDate.getDate() > today.getDate()
    ) {
      return false;
    }
    if (task.frequency.frequencyValue === TaskFrequenciesEnum.Weekend) {
      return today.getDay() == 6 || today.getDay() == 0;
    }
    if (task.frequency.frequencyValue === TaskFrequenciesEnum.Workday) {
      return today.getDay() != 6 && today.getDay() != 0;
    }
    return true;
  }
}

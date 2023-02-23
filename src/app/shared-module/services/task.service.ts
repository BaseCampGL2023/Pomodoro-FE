import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { TrackerService } from 'src/app/home-page/services/tracker.service';
import { Task } from '../types/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(
    private http: HttpClient,
    private trackerService: TrackerService
  ) {
    this.trackerService.castPomoFinished.subscribe((isDone: boolean) => {
      if (isDone && this.curTaskId != null) {
        this.addPomodoro(this.curTaskId);
      }
    });
  }

  private curTaskId: string | null = null;
  private isNewTask = new Subject<boolean>();

  // tracker need to subscribe on it and updateView if selected new task
  castIsNewTask = this.isNewTask.asObservable();

  setCurTaskId(taskId: string | null) {
    if (this.curTaskId == taskId) {
      return;
    }
    this.curTaskId = taskId;
    this.isNewTask.next(true);
  }

  addPomodoro(taskId: string) {
    // todo: request to backend
    console.log(`add pomodoro to task${taskId} in db`);
  }

  getTodayTasks(): Observable<Task[]> {
    return of(this.getTasks());
  }

  getTasksOnDate(date: Date): Observable<Task[]> {
    return of(this.getTasks());
  }

  private getTasks(): Task[] {
    return [
      {
        id: '1',
        title: 'task1',
        frequency: 'dayly',
        allocatedTime: 1000,
        progress: 50,
      },
      {
        id: '2',
        title: 'task2',
        frequency: '',
        allocatedTime: 600,
        progress: 10,
      },
      {
        id: '3',
        title: 'task3',
        frequency: 'mounthly',
        allocatedTime: 30,
        progress: 25,
      },
      {
        id: '4',
        title: 'task4',
        frequency: 'dayly',
        allocatedTime: 1500,
        progress: 100,
      },
      {
        id: '5',
        title: 'task5',
        frequency: 'dayly',
        allocatedTime: 1100,
        progress: 60,
      },
      {
        id: '6',
        title: 'task6',
        frequency: 'dayly',
        allocatedTime: 1100,
        progress: 100,
      },
      {
        id: '7',
        title: 'task7',
        frequency: 'dayly',
        allocatedTime: 1100,
        progress: 35,
      },
      {
        id: '8',
        title: 'task8',
        frequency: 'dayly',
        allocatedTime: 1600,
        progress: 40,
      },
      {
        id: '9',
        title: 'task9',
        frequency: 'dayly',
        allocatedTime: 1100,
        progress: 55,
      },
      {
        id: '10',
        title: 'task10',
        frequency: 'dayly',
        allocatedTime: 1100,
        progress: 80,
      },
      {
        id: '11',
        title: 'task11',
        frequency: 'dayly',
        allocatedTime: 1100,
        progress: 95,
      },
    ];
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { TrackerService } from 'src/app/home-page/services/tracker.service';
import { TrackerDurationEnum } from 'src/app/home-page/types/tracker-duration.enum';
import { Task } from '../types/task';
import { TaskForList } from '../types/task-for-list';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(
    private http: HttpClient,
    private trackerService: TrackerService
  ) {
    this.trackerService.castFinished.subscribe(
      (trackerDuration: TrackerDurationEnum) => {
        if (
          this.curTaskId != null &&
          trackerDuration == TrackerDurationEnum.pomodoro
        ) {
          this.addPomodoro(this.curTaskId);
        }
      }
    );
  }

  private curTaskId: string | null = null;
  private isNewTask = new Subject<boolean>();

  castIsNewTask = this.isNewTask.asObservable();

  setCurTaskId(taskId: string | null) {
    if (this.curTaskId == taskId) {
      return;
    }
    this.curTaskId = taskId;
    // todo: invoke TrackerService reload method and remove castIsNewTask
    this.isNewTask.next(true);
  }

  addPomodoro(taskId: string) {
    // todo: request to backend
    console.log(`add pomodoro to task${taskId} in db`);
  }

  getFrequencies(): string[] {
    return this.frequencies();
  }

  updateTask(task: Task): Observable<any> {
    return of(console.log(`updates task${task.id} in db`));
  }

  completeCurrentTask(): Observable<any> {
    return of(console.log(`completes task${this.curTaskId} in db`));
  }

  deleteCurrentTask(): Observable<any> {
    return of(console.log(`deletes task${this.curTaskId} in db`));
  }

  getCurrentTask(): Observable<Task> {
    return this.getTaskById(this.curTaskId!);
  }

  getTaskById(taskId: string): Observable<Task> {
    return of(this.getTask());
  }

  getTodayTasks(): Observable<TaskForList[]> {
    return of(this.getTasks());
  }

  getTasksOnDate(date: Date): Observable<TaskForList[]> {
    return of(this.getTasks());
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
      frequency: 'Day',
      allocatedTime: 1100,
      initialDate: new Date(2023, 1, 20),
    };
  }

  private frequencies(): string[] {
    return ['None', 'Day', 'Week', 'Month', 'Year', 'Workday', 'Weekend'];
  }
}

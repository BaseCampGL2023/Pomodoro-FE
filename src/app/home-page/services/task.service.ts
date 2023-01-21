import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../types/task';


@Injectable()
export class TaskService {

    public getTasks(): Observable<Task[]> {
        return new Observable(observer => {
            observer.next([
                { title: 'task1', frequency: 'dayly', allocatedTime: 100, progress: 50 },
                { title: 'task2', frequency: '', allocatedTime: 350, progress: 10 },
                {
                    title: 'task3',
                    frequency: 'mounthly',
                    allocatedTime: 30,
                    progress: 25,
                },
                { title: 'task4', frequency: 'dayly', allocatedTime: 150, progress: 100 },
                { title: 'task5', frequency: 'dayly', allocatedTime: 110, progress: 75 }
            ]);
        });
    }
}
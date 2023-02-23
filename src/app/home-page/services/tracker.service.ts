import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TrackerDurationEnum } from '../types/tracker-duration.enum';
import { TrackerSettings } from '../types/tracker-settings';

@Injectable({ providedIn: 'root' })
export class TrackerService {
  private settings = new BehaviorSubject<TrackerSettings>({
    pomoDuration: 25,
    longBreak: 15,
    shortBreak: 5,
  });
  private countdownFinished = new Subject<TrackerDurationEnum>();

  castSettings = this.settings.asObservable();
  castFinished = this.countdownFinished.asObservable();

  editSettings(newSettings: TrackerSettings) {
    this.settings.next(newSettings);
  }
  emitFinished(trackerDuration: TrackerDurationEnum) {
    this.countdownFinished.next(trackerDuration);
  }
}

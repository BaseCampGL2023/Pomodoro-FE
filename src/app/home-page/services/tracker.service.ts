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
  private pomoCountdownFinished = new Subject<boolean>();
  private shortbCountdownFinished = new Subject<boolean>();
  private longbCountdownFinished = new Subject<boolean>();

  castSettings = this.settings.asObservable();
  castPomoFinished = this.pomoCountdownFinished.asObservable();
  castShortbFinished = this.shortbCountdownFinished.asObservable();
  castLongbFinished = this.longbCountdownFinished.asObservable();

  editSettings(newSettings: TrackerSettings) {
    this.settings.next(newSettings);
  }

  emitFinished(done: boolean, trackerDuration: TrackerDurationEnum) {
    switch (trackerDuration) {
      case TrackerDurationEnum.pomodoro:
        this.pomoCountdownFinished.next(done);
        break;
      case TrackerDurationEnum.shortBreak:
        this.shortbCountdownFinished.next(done);
        break;
      case TrackerDurationEnum.longBreak:
        this.longbCountdownFinished.next(done);
        break;
    }
  }
}

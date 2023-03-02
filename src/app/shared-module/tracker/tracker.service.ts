import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
//import { Title } from '@angular/platform-browser';

import { TrackerDurationEnum } from './types/tracker-duration.enum';
import { TrackerModeEnum } from './types/tracker-mode.enum';
import { TrackerSettingsService } from './tracker-settings.service';
import { TrackerEventEnum } from './types/tracker-event.enum';
import { TrackerEvent } from './types/tracker-event';

@Injectable({ providedIn: 'root' })
export class TrackerService implements OnDestroy {
  //private settings = new BehaviorSubject<TrackerSettings>(new TrackerSettings());

  //castSettings = this.settings.asObservable();

  // editSettings(newSettings: TrackerSettings) {
  //   this.settings.next(newSettings);
  // }
  //strSec: string = '00';
  //strMin: string = '00';

  duration: TrackerDurationEnum = TrackerDurationEnum.pomodoro;
  mode: TrackerModeEnum = TrackerModeEnum.pristine;

  private timerId = NaN;
  //private startStamp = 0;
  private tick = 0;

  constructor(
    public settings: TrackerSettingsService //private title: Title
  ) {}

  ngOnDestroy(): void {
    if (isNaN(this.timerId)) {
      return;
    }
    window.clearInterval(this.timerId);
  }

  get timeSpan(): number {
    //TODO: return minutes
    return this.settings[this.duration]; // * 60;
  }
  get strSec(): string {
    const seconds = (this.timeSpan - this.tick) % 60;
    return seconds > 9 ? seconds.toString() : `0${seconds.toString()}`;
  }
  get strMin(): string {
    const minutes =
      (this.timeSpan - this.tick - ((this.timeSpan - this.tick) % 60)) / 60;
    return minutes > 9 ? minutes.toString() : `0${minutes.toString()}`;
  }

  setDuration(duration: TrackerDurationEnum): void {
    if (this.duration == duration) {
      return;
    }
    this.duration = duration;
    this.reload();
  }

  start(): void {
    if (this.mode == TrackerModeEnum.countdown && !isNaN(this.timerId)) {
      return;
    }
    this.timerId = window.setInterval(this.countdown.bind(this), 1000);
    this.mode = TrackerModeEnum.countdown;
    this.emitEvent(TrackerEventEnum.start);
  }

  pause(): void {
    if (this.mode != TrackerModeEnum.countdown && !isNaN(this.timerId)) {
      return;
    }
    window.clearInterval(this.timerId);
    this.timerId = NaN;
    this.mode = TrackerModeEnum.pause;
    this.emitEvent(TrackerEventEnum.stop);
    //TODO emit paused
  }

  reload(): void {
    if (this.mode == TrackerModeEnum.pristine) {
      return;
    }
    window.clearInterval(this.timerId);
    this.timerId = NaN;
    this.mode = TrackerModeEnum.pristine;
    this.tick = 0;
    this.emitEvent(TrackerEventEnum.reset);
  }

  countdown(): void {
    this.tick++;
    if (this.timeSpan - this.tick <= 0) {
      window.clearInterval(this.timerId);
      this.timerId = NaN;
      this.emitEvent(TrackerEventEnum.finish);
      this.tick = 0;
      this.mode = TrackerModeEnum.pristine;
    }
  }

  private trackerEvent = new Subject<TrackerEvent>();

  event = this.trackerEvent.asObservable();

  private emitEvent(type: TrackerEventEnum, duration?: TrackerDurationEnum) {
    this.trackerEvent.next(new TrackerEvent(type, duration ?? this.duration));
  }
}

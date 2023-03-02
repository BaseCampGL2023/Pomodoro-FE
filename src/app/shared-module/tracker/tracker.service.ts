import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { TrackerDurationEnum } from './types/tracker-duration.enum';
import { TrackerModeEnum } from './types/tracker-mode.enum';
import { TrackerSettingsService } from './tracker-settings.service';
import { TrackerEventEnum } from './types/tracker-event.enum';
import { TrackerEvent } from './types/tracker-event';

@Injectable({ providedIn: 'root' })
export class TrackerService implements OnDestroy {
  duration: TrackerDurationEnum = TrackerDurationEnum.pomodoro;
  mode: TrackerModeEnum = TrackerModeEnum.pristine;

  private trackerEvent = new Subject<TrackerEvent>();
  private trackerTick = new Subject<void>();

  event = this.trackerEvent.asObservable();
  tickEvent = this.trackerTick.asObservable();

  private timerId = NaN;
  private tick = 0;
  private session = 0;

  constructor(public settings: TrackerSettingsService) {}

  ngOnDestroy(): void {
    if (isNaN(this.timerId)) {
      return;
    }
    window.clearInterval(this.timerId);
  }

  get timeSpan(): number {
    return this.settings[this.duration] * 60;
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
    this.emitTick();
    if (this.timeSpan - this.tick <= 0) {
      window.clearInterval(this.timerId);
      this.timerId = NaN;
      this.emitEvent(TrackerEventEnum.finish);
      this.tick = 0;
      this.changeDuration();
      this.mode = TrackerModeEnum.pristine;
      this.autostart();
    }
  }

  autostart() {
    if (this.settings.autostartEnabled) {
      this.start();
    }
  }
  changeDuration() {
    if (this.duration === TrackerDurationEnum.shortBreak) {
      this.duration = TrackerDurationEnum.pomodoro;
      return;
    }
    if (this.duration === TrackerDurationEnum.longBreak) {
      this.duration = TrackerDurationEnum.pomodoro;
      this.session = 0;
      return;
    }

    ++this.session;

    if (this.session < this.settings.pomodorosBeforeLongBreak) {
      this.duration = TrackerDurationEnum.shortBreak;
    } else {
      this.duration = TrackerDurationEnum.longBreak;
    }
  }

  private emitEvent(type: TrackerEventEnum, duration?: TrackerDurationEnum) {
    this.trackerEvent.next(new TrackerEvent(type, duration ?? this.duration));
  }

  private emitTick() {
    this.trackerTick.next();
  }
}

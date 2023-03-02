import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
//import { Title } from '@angular/platform-browser';

import { TrackerDurationEnum } from '../types/tracker-duration.enum';
import { TrackerModeEnum } from '../types/tracker-mode.enum';
import { TrackerSettingsService } from './tracker-settings.service';

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
    this.emitStarted();
  }

  pause(): void {
    if (this.mode != TrackerModeEnum.countdown && !isNaN(this.timerId)) {
      return;
    }
    window.clearInterval(this.timerId);
    this.timerId = NaN;
    this.mode = TrackerModeEnum.pause;
    this.emitPaused();
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
    this.emitReseted();
  }

  countdown(): void {
    this.tick++;
    //this.title.setTitle(`${this.strMin} : ${this.strSec}`);
    //console.log(`${this.strMin} : ${this.strSec}`);
    if (this.timeSpan - this.tick <= 0) {
      window.clearInterval(this.timerId);
      this.timerId = NaN;
      this.emitFinished();
      this.tick = 0;
      this.mode = TrackerModeEnum.pristine;
    }
  }

  private countdownFinished = new Subject<TrackerDurationEnum>();
  onFinished = this.countdownFinished.asObservable();
  emitFinished(duration?: TrackerDurationEnum) {
    this.countdownFinished.next(duration ?? this.duration);
  }

  private countdownStarted = new Subject<TrackerDurationEnum>();
  onStarted = this.countdownStarted.asObservable();
  emitStarted(duration?: TrackerDurationEnum) {
    this.countdownStarted.next(duration ?? this.duration);
  }

  private countdownReseted = new Subject<TrackerDurationEnum>();
  onReseted = this.countdownReseted.asObservable();
  emitReseted(duration?: TrackerDurationEnum) {
    this.countdownReseted.next(duration ?? this.duration);
  }

  private countdownPaused = new Subject<TrackerDurationEnum>();
  onPaused = this.countdownPaused.asObservable();
  emitPaused(duration?: TrackerDurationEnum) {
    this.countdownPaused.next(duration ?? this.duration);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';

import { TrackerSettings } from '../../types/tracker-settings';
import { TrackerService } from '../../services/tracker.service';
import { TrackerDurationEnum } from '../../types/tracker-duration.enum';
import { TaskService } from 'src/app/shared-module/services/task.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent implements OnInit, OnDestroy {
  trackerSettings!: TrackerSettings;
  curMin!: string;
  curSec!: string;
  curTimeSpan!: number;
  timerId = NaN;
  startStamp = 0;
  timerDuration: typeof TrackerDurationEnum = TrackerDurationEnum;
  curTimerDuration: TrackerDurationEnum = TrackerDurationEnum.pomodoro;

  constructor(
    private trackerService: TrackerService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.trackerService.castSettings.subscribe(
      (settings) => (this.trackerSettings = settings)
    );
    this.taskService.castIsNewTask.subscribe((isNewTask) => {
      if (isNewTask) {
        this.onTimerReload();
      }
    });
    //not magic at all, 60 seconds in 1 minute
    this.curTimeSpan = this.trackerSettings.pomoDuration * 60;
    this.updateView(this.curTimeSpan);
  }

  ngOnDestroy(): void {
    if (isNaN(this.timerId)) {
      return;
    }
    window.clearInterval(this.timerId);
  }

  onSetActivity(duration: TrackerDurationEnum) {
    if (duration == this.curTimerDuration) {
      return;
    }
    this.onTimerReload();
    this.curTimerDuration = duration;
    this.curTimeSpan = this.trackerSettings[this.curTimerDuration] * 60;
    this.updateView(this.curTimeSpan);
  }

  onTimerStart() {
    if (!isNaN(this.timerId)) {
      return;
    }
    this.startStamp = new Date().getTime();
    this.timerId = window.setInterval(this.countDown.bind(this), 1000);
  }

  onTimerReload() {
    if (isNaN(this.timerId)) {
      this.curTimeSpan = this.trackerSettings[this.curTimerDuration] * 60;
      this.updateView(this.curTimeSpan);
      return;
    }
    window.clearInterval(this.timerId);
    this.curTimeSpan = this.trackerSettings[this.curTimerDuration] * 60;
    this.updateView(this.curTimeSpan);
    this.timerId = NaN;
  }

  onTimerPause() {
    window.clearInterval(this.timerId);
    const curStamp = new Date().getTime();
    const diff = Math.round((curStamp - this.startStamp) / 1000);
    this.curTimeSpan -= diff;
    this.timerId = NaN;
  }

  countDown() {
    const curStamp = new Date().getTime();
    //convert from ms to s
    const diff = Math.round((curStamp - this.startStamp) / 1000);

    if (diff > this.curTimeSpan) {
      window.clearInterval(this.timerId);
      this.timerId = NaN;
      this.curTimeSpan = this.trackerSettings[this.curTimerDuration] * 60;
      this.trackerService.emitFinished(this.curTimerDuration);
      return;
    }

    this.updateView(this.curTimeSpan - diff);
  }

  private updateView(timeSpan: number) {
    const seconds = timeSpan % 60;
    const minutes = (timeSpan - seconds) / 60;
    this.curMin = minutes > 9 ? minutes.toString() : '0' + minutes.toString();
    this.curSec = seconds > 9 ? seconds.toString() : '0' + seconds.toString();
  }
}

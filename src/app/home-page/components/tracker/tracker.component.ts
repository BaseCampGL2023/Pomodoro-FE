import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { TrackerSettings } from '../../types/tracker-settings';
import { TrackerSettingsService } from '../../services/tracker-settings.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})

export class TrackerComponent implements OnInit, OnDestroy {
  @Output() countDownFinished = new EventEmitter<boolean>();
  
  trackerSettings!: TrackerSettings;
  curMin!: string;
  curSec: string = '00';
  curTimeSpan!: number;
  timerId: number = 0;
  startStamp: number = 0;

  constructor(
    private trackerSettingsService: TrackerSettingsService,
    ){}

  ngOnInit(){
    this.trackerSettingsService.castSettings.subscribe(
      settings => this.trackerSettings = settings
    );
    this.curMin = this.trackerSettings.pomoDuration.toString();
    //not magic at all, 60 seconds in 1 minute
    this.curTimeSpan = this.trackerSettings.pomoDuration * 60;
  }

  ngOnDestroy(): void {
    window.clearInterval(this.timerId);
  }

  onTimerStart(){
    this.startStamp = new Date().getTime();
    this.timerId = window.setInterval(this.countDown.bind(this), 1000);
  }

  onTimerReload(){
    window.clearInterval(this.timerId);
    this.updateView(this.curTimeSpan);
  }

  countDown(){
    let curStamp = new Date().getTime();
    //convert from ms to s
    let diff = Math.round((curStamp - this.startStamp) / 1000);

    if(diff > this.curTimeSpan){
      window.clearInterval(this.timerId);
      this.countDownFinished.emit(true);
      return;
    }

    this.updateView(this.curTimeSpan - diff);
  }

  updateView(timeSpan: number){
    let seconds = timeSpan  % 60;
    let minutes = (timeSpan - seconds) / 60;
    this.curMin = minutes > 9 ? minutes.toString() : '0' + minutes.toString();
    this.curSec = seconds > 9 ? seconds.toString() : '0' + seconds.toString();
  }
}

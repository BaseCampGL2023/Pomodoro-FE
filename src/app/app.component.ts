import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from './shared-module/auth/auth.service';
import { TrackerService } from './shared-module/tracker/tracker.service';
import { TrackerEventEnum } from './shared-module/tracker/types/tracker-event.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  defaultTitle = 'Pomodoro';

  constructor(
    private authService: AuthService,
    private title: Title,
    private tracker: TrackerService
  ) {}

  ngOnInit(): void {
    this.authService.init();
    this.tracker.tickEvent.subscribe(() => {
      this.title.setTitle(
        `${this.tracker.strMin}:${this.tracker.strSec} | ${this.tracker.mode}`
      );
    });
    this.tracker.event.subscribe((event) => {
      this.setTitle(event.eventType);
      this.playNotification(event.eventType);
    });
  }

  private setTitle(event: TrackerEventEnum) {
    if(event === TrackerEventEnum.finish || event === TrackerEventEnum.reset){
      this.title.setTitle(this.defaultTitle);
    } else {
      this.title.setTitle(`${this.tracker.strMin}:${this.tracker.strSec} | ${this.tracker.mode}`);
    }
  }

  private playNotification(event: TrackerEventEnum) {
    switch (event) {
      case TrackerEventEnum.start:
      case TrackerEventEnum.autostart:
        this.playSound('../assets/sound/start.mp3');
        break;
      case TrackerEventEnum.finish:
        this.playSound('../assets/sound/stop.mp3');
        break;
      case TrackerEventEnum.stop:
        this.playSound('../assets/sound/stop.mp3');
        break;
      case TrackerEventEnum.reset:
        this.playSound('../assets/sound/stop.mp3');
    }
  }

  private playSound(url: string) {
    const audio = new Audio(url);
    audio.play();
  }
}

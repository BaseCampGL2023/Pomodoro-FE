import { Component } from '@angular/core';

import { TrackerService } from 'src/app/shared-module/tracker/tracker.service';
import { TrackerDurationEnum } from 'src/app/shared-module/tracker/types/tracker-duration.enum';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent {
  timerDuration: typeof TrackerDurationEnum = TrackerDurationEnum;

  constructor(protected trackerService: TrackerService) {}

  onSetActivity(duration: TrackerDurationEnum) {
    this.trackerService.setDuration(duration);
  }

  onTimerStart() {
    this.trackerService.start();
  }

  onTimerReload() {
    this.trackerService.reload();
  }

  onTimerPause() {
    this.trackerService.pause();
  }
}

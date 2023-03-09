import { Component, OnInit } from '@angular/core';
import { TrackerDurationEnum } from 'src/app/shared-module/tracker/types/tracker-duration.enum';
import { TrackerService } from '../../../shared-module/tracker/tracker.service';
import { TrackerEventEnum } from '../../../shared-module/tracker/types/tracker-event.enum';

@Component({
  selector: 'app-finish-modal',
  templateUrl: './finish-modal.component.html',
  styleUrls: ['./finish-modal.component.scss'],
})
export class FinishModalComponent implements OnInit {
  pomodoro_visibility = true;
  break_visibility = true;

  constructor(private tracker: TrackerService) {}

  ngOnInit(): void {
    this.tracker.event.subscribe((event) => {
      if (
        event.eventType === TrackerEventEnum.finish &&
        event.duration === TrackerDurationEnum.pomodoro
      ) {
        this.pomodoro_visibility = false;
        setTimeout(() => (this.pomodoro_visibility = true), 7000);
      } 
      else if(event.eventType === TrackerEventEnum.finish &&
        event.duration === TrackerDurationEnum.longBreak)
      {
        this.break_visibility = false;
        setTimeout(() => (this.break_visibility = true), 10000);
      }
      else if(event.eventType === TrackerEventEnum.finish &&
        event.duration === TrackerDurationEnum.shortBreak)
      {
        this.break_visibility = false;
        setTimeout(() => (this.break_visibility = true), 10000);
      }
    });
  }
}

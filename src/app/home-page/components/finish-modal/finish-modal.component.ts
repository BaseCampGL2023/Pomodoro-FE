import { Component,OnInit } from '@angular/core';
import { TrackerService } from '../../../shared-module/tracker/tracker.service';
import { TrackerEventEnum } from '../../../shared-module/tracker/types/tracker-event.enum';

@Component({
  selector: 'app-finish-modal',
  templateUrl: './finish-modal.component.html',
  styleUrls: ['./finish-modal.component.scss']
})

export class FinishModalComponent implements OnInit{
  visibility:boolean = true;
  
  constructor(
    private tracker: TrackerService
  ) {}

  ngOnInit(): void
  {
    this.tracker.event.subscribe((event)=> {
      if (event.eventType === TrackerEventEnum.finish)
      {
        this.visibility = false;
        setTimeout(()=>this.visibility = true,7000)
      }
      else
      {
        this.visibility = true;
      }
    });
  }
}

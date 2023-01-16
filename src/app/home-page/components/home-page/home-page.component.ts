import { Component, OnInit } from '@angular/core';

import { TrackerService } from '../../services/tracker.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private trackerService: TrackerService) {}

  ngOnInit(): void {
    //TODO: implement useful handler in subscribe
    this.trackerService.castFinished.subscribe((val) => {
      if (val) {
        console.log('Done');
      }
    });
  }
}

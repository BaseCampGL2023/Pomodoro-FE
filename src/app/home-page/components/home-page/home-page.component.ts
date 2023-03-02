import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from 'src/app/shared-module/auth/auth.service';
import { TrackerService } from '../../services/tracker.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject();
  isLoggedIn = false;

  constructor(
    private trackerService: TrackerService,
    private authService: AuthService
  ) {
    this.authService.authStatus
      .pipe(takeUntil(this.destroySubject))
      .subscribe((result) => {
        this.isLoggedIn = result;
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    //TODO: implement useful handler in subscribe
    this.trackerService.onFinished.subscribe((val) =>
      console.log(`${val} finished`)
    );
    this.trackerService.onPaused.subscribe((val) =>
      console.log(`${val} paused`)
    );
    this.trackerService.onReseted.subscribe((val) =>
      console.log(`${val} reseted`)
    );
    this.trackerService.onStarted.subscribe((val) =>
      console.log(`${val} started`)
    );
  }
}

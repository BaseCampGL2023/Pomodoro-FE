import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/shared-module/auth/auth.service';
import { TrackerService } from '../../services/tracker.service';
import { SignupPopUpComponent } from 'src/app/modals/signup-pop-up/signup-pop-up.component';

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
    private authService: AuthService,
    private dialog: MatDialog
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
    this.trackerService.castFinished.subscribe((val) => {
      if (val) {
        console.log('Done');
      }
    });
    this.dialog.open(SignupPopUpComponent);
  }
}

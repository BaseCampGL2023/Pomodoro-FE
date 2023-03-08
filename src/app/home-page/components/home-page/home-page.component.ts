import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from 'src/app/shared-module/auth/auth.service';
import { TrackerService } from '../../services/tracker.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [CookieService],
})
export class HomePageComponent implements OnInit, OnDestroy {
  private readonly returnUrlKey = 'returnUrl';
  private readonly externalLoginResponseKey = 'ExternalLoginResponse';
  
  private destroySubject = new Subject();
  isLoggedIn = false;

  constructor(
    private trackerService: TrackerService,
    private authService: AuthService,
    cookieService: CookieService,
    router: Router,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.queryParams.subscribe((params) => {
      if (params) {
        const returnUrl = params[this.returnUrlKey];
        if (returnUrl) {
          const externalLoginResponse = cookieService.get(this.externalLoginResponseKey);
          console.log(externalLoginResponse);
          router.navigate([returnUrl]);
        }
      }
    });

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
  }
}

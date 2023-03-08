import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { LoginPopUpComponent } from 'src/app/modals/login-pop-up/login-pop-up.component';

import { AuthService } from 'src/app/shared-module/auth/auth.service';
import { AuthMatDialogData } from 'src/app/shared-module/types/auth-mat-dialog-data';
import { LoginResult } from 'src/app/shared-module/types/login-result';
import { TrackerService } from '../../services/tracker.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [CookieService],
})
export class HomePageComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject();
  isLoggedIn = false;

  constructor(
    private trackerService: TrackerService,
    private authService: AuthService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
  ) {
    this.authService.authStatus
      .pipe(takeUntil(this.destroySubject))
      .subscribe((result) => {
        this.isLoggedIn = result;
      });
    this.completeExternalLogin();
  }

  completeExternalLogin() {
    const returnUrlKey = 'returnUrl';
    const externalLoginResponseKey = 'ExternalLoginResponse';

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params) {
        const returnUrl = params[returnUrlKey];
        if (returnUrl) {
          const externalLoginResponse = this.cookieService.get(
            externalLoginResponseKey
          );
          if (externalLoginResponse) {
            const loginResult: LoginResult = JSON.parse(externalLoginResponse);
            if (loginResult.success && loginResult.token) {
              this.authService.completeAuth(loginResult.token);
              this.router.navigate([returnUrl]);
              this.cookieService.delete(externalLoginResponseKey);
            } else {
              this.matDialog.open(LoginPopUpComponent, {
                data: <AuthMatDialogData>{
                  returnUrl: returnUrl,
                  serverResponse: loginResult.message,
                }
              });
            }
          }
        }
      }
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

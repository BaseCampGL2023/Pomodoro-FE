import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { LoginPopUpComponent } from 'src/app/modals/login-pop-up/login-pop-up.component';
import { SettingsPopUpComponent } from 'src/app/modals/settings-pop-up/settings-pop-up.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  private destroySubject = new Subject();
  isLoggedIn = false;

  constructor(
    private dialogRef: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.authStatus
      .pipe(takeUntil(this.destroySubject))
      .subscribe((result) => {
        this.isLoggedIn = result;
      });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    //
    this.dialogRef.open(LoginPopUpComponent);
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

  openLogin() {
    this.dialogRef.open(LoginPopUpComponent);
  }
  openSettings() {
    this.dialogRef.open(SettingsPopUpComponent);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

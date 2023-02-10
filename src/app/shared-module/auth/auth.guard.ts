import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { LoginPopUpComponent } from 'src/app/modals/login-pop-up/login-pop-up.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialog
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.dialogRef.open(LoginPopUpComponent);
    return false;
  }
}

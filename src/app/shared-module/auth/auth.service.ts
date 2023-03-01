import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

import { LoginRequest } from '../types/login-request';
import { LoginResult } from '../types/login-result';
import { environment } from 'src/environments/environment';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private _authStatus = new Subject<boolean>();
  public authStatus = this._authStatus.asObservable();

  private socialUser: SocialUser | null;

  constructor(
    private http: HttpClient,
    private socialAuthService: SocialAuthService
  ) {
    this.socialUser = null;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  init(): void {
    if (this.isAuthenticated()) {
      this.setAuthStatus(true);
    }
  }

  login(item: LoginRequest): Observable<LoginResult> {
    const url = environment.baseUrl + 'account/login';
    return this.http.post<LoginResult>(url, item).pipe(
      tap((loginResult) => {
        if (loginResult.success && loginResult.token) {
          localStorage.setItem(this.tokenKey, loginResult.token);
          this.setAuthStatus(true);
        }
      })
    );
  }

  loggedInViaExternalService(): boolean {
    return this.socialUser !== null;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.setAuthStatus(false);

    if (this.loggedInViaExternalService()) {
      this.socialAuthService.signOut();
    }
  }

  continueWithGoogle(user: SocialUser) {
    this.socialUser = user;
    // TODO send api req
  }

  private setAuthStatus(isAuthenticated: boolean): void {
    this._authStatus.next(isAuthenticated);
  }
}

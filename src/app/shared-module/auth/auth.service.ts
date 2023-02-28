import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { LoginRequest } from '../types/login-request';
import { LoginResult } from '../types/login-result';
import { environment } from 'src/environments/environment';
import { Guid } from '../types/guid';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly userIdClaim = 'userId';

  private _authStatus = new Subject<boolean>();
  public authStatus = this._authStatus.asObservable();

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken[this.userIdClaim];
    }
    return Guid.empty;
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

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.setAuthStatus(false);
  }

  private setAuthStatus(isAuthenticated: boolean): void {
    this._authStatus.next(isAuthenticated);
  }
}

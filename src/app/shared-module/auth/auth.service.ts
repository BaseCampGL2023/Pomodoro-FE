import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { LoginRequest } from "../types/login-request";
import { LoginResult } from "../types/login-result";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(
        protected http: HttpClient
    ) {}

    public tokenKey: string = "token";

    isAuthenticated(): boolean {
        return this.getToken() !== null;
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    login(item: LoginRequest): Observable<LoginResult> {
        let url = "https://localhost:7234" + "/api/account/login";
        return this.http.post<LoginResult>(url, item);
    }
}
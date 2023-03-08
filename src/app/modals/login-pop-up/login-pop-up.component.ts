import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from 'src/app/shared-module/auth/auth.service';
import { LoginRequest } from 'src/app/shared-module/types/login-request';
import { LoginResult } from 'src/app/shared-module/types/login-result';
import { ReturnUrl } from 'src/app/shared-module/types/return-url';
import { SignupPopUpComponent } from '../signup-pop-up/signup-pop-up.component';
import { ExternalLoginProviders } from 'src/app/shared-module/types/external-login-providers';

@Component({
  selector: 'app-login-pop-up',
  templateUrl: './login-pop-up.component.html',
  styleUrls: ['./login-pop-up.component.scss'],
})
export class LoginPopUpComponent {
  loginRequest = <LoginRequest>{};
  loginResult?: LoginResult;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private returnUrl: ReturnUrl
  ) {
    this.loginForm.reset(this.loginRequest);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      Object.assign(this.loginRequest, this.loginForm.value);
      this.authService.login(this.loginRequest).subscribe({
        next: (result) => {
          this.loginResult = result;
          if (result.success) {
            this.dialog.closeAll();
            if (this.returnUrl) {
              this.router.navigate([this.returnUrl.url]);
            }
          }
        },
        error: (error) => {
          if (error.status == 401) {
            this.loginResult = error.error;
            this.resetForm();
          }
        },
      });
    }
  }

  onSignUp() {
    this.dialog.closeAll();
    this.dialog.open(SignupPopUpComponent, {
      data: {
        url: this.returnUrl.url,
      },
    });
  }

  resetForm() {
    this.loginRequest = <LoginRequest>{};
    this.loginForm.reset();
  }

  loginViaGoogle(): void {
    const returnUrl = this.returnUrl ? this.returnUrl.url : '/';
    this.authService.externalLogin(ExternalLoginProviders.Google, returnUrl);
  }
}

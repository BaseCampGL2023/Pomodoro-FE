import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared-module/auth/auth.service';
import { ExternalLoginProviders } from 'src/app/shared-module/types/external-login-providers';
import { ReturnUrl } from 'src/app/shared-module/types/return-url';
import { SignupRequest } from 'src/app/shared-module/types/signup-request';
import { SignupResult } from 'src/app/shared-module/types/signup-result';

import { MatchValidator } from 'src/app/shared-module/validation/match';
import { LoginPopUpComponent } from '../login-pop-up/login-pop-up.component';

@Component({
  selector: 'app-signup-pop-up',
  templateUrl: './signup-pop-up.component.html',
  styleUrls: [
    '../login-pop-up/login-pop-up.component.scss',
    './signup-pop-up.component.scss',
  ],
})
export class SignupPopUpComponent {
  signupRequest = <SignupRequest>{};
  signupResult?: SignupResult;

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.pattern('^[A-Za-z ]+$')],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      MatchValidator.Match('confirmPassword', true),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      MatchValidator.Match('password'),
    ]),
    agreement: new FormControl('', [Validators.requiredTrue]),
  });

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) private returnUrl: ReturnUrl
  ) {}

  onSubmit() {
    if (this.signUpForm.valid) {
      this.signupRequest.userName = this.signUpForm.controls['name'].value;
      this.signupRequest.email = this.signUpForm.controls['email'].value;
      this.signupRequest.password = this.signUpForm.controls['password'].value;
      this.signupRequest.confirmPassword =
        this.signUpForm.controls['confirmPassword'].value;

      this.authService.signup(this.signupRequest).subscribe({
        next: (result) => {
          this.signupResult = result;
          if (result.success) {
            this.toSignIn();
          }
        },
        error: (error) => {
          if (!error?.error?.success) {
            this.signupResult = error.error;
            this.resetForm();
          }
        },
      });
    }
  }

  onSignIn() {
    this.toSignIn();
  }

  resetForm() {
    this.signupRequest = <SignupRequest>{};
    this.signUpForm.reset();
  }

  signUpViaGoogle(): void {
    const returnUrl = this.returnUrl ? this.returnUrl.url : '/';
    this.authService.externalLogin(ExternalLoginProviders.Google, returnUrl);
  }

  private toSignIn() {
    this.dialog.closeAll();
    this.dialog.open(LoginPopUpComponent);
  }
}

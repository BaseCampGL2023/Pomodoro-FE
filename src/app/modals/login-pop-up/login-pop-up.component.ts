import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/shared-module/auth/auth.service';
import { LoginRequest } from 'src/app/shared-module/types/login-request';
import { LoginResult } from 'src/app/shared-module/types/login-result';

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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private dialogRef: MatDialog
  ) {
    this.loginForm.reset(this.loginRequest);
  }

  onSubmit() {
    console.log(this.loginRequest);
    if (this.loginForm.valid) {
      Object.assign(this.loginRequest, this.loginForm.value);
      this.authService.login(this.loginRequest).subscribe({
        next: (result) => {
          this.loginResult = result;
          if (result.success) {
            this.dialogRef.closeAll();
          }
        },
        error: (error) => {
          if (error.status == 401) {
            this.loginResult = error.error;
            console.log(this.loginResult);
          }
        },
      });
    }
  }

  resetForm() {
    this.loginRequest = <LoginRequest>{};
    this.loginForm.reset();
  }
}

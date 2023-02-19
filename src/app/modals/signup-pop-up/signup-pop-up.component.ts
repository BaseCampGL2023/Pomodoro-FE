import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

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
    private dialog: MatDialog
  ) {}

  onSubmit() {
    console.log('submit');
  }

  onSignIn() {
    this.toSignIn();
  }

  resetForm() {
    console.log('sign up');
  }

  private toSignIn() {
    this.dialog.closeAll();
    this.dialog.open(LoginPopUpComponent);
  }
}

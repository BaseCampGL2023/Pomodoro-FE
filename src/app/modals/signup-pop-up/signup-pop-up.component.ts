import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatchValidator } from 'src/app/shared-module/validation/match';

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

  onSubmit() {
    console.log('submit');
  }

  onSignIn() {
    console.log('sign in');
  }

  resetForm() {
    console.log('sign up');
  }
}

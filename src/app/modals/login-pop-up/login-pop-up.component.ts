import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-pop-up',
  templateUrl: './login-pop-up.component.html',
  styleUrls: ['./login-pop-up.component.scss']
})
export class LoginPopUpComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
})
  onSubmit() {
    //TODO
  console.warn(this.loginForm.value); //log a message to browser console 
  }
}

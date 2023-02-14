import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings-pop-up',
  templateUrl: './settings-pop-up.component.html',
  styleUrls: ['./settings-pop-up.component.scss'],
})
export class SettingsPopUpComponent {
  settingsForm = new FormGroup({
    pomodoro: new FormControl(''),
    shortbreak: new FormControl(''),
    longbreak: new FormControl(''),
  });
  onSubmit() {
    //TODO
    console.warn(this.settingsForm.value); //log a message to browser console
  }
}

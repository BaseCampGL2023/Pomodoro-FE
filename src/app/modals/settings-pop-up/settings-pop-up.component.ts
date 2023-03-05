import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  ValidatorFn,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from 'src/app/shared-module/services/settings.service';
import { TrackerSettings } from 'src/app/shared-module/tracker/types/tracker-settings';

@Component({
  selector: 'app-settings-pop-up',
  templateUrl: './settings-pop-up.component.html',
  styleUrls: ['./settings-pop-up.component.scss'],
})
export class SettingsPopUpComponent implements OnInit {
  settingsForm = <FormGroup>{};

  private settings = <TrackerSettings>{};

  private readonly minValue = 1;
  private readonly maxValue = 255;

  private readonly settingsValidators: ValidatorFn[] = [
    Validators.required,
    Validators.min(this.minValue),
    Validators.max(this.maxValue),
  ];

  constructor(
    private settingsService: SettingsService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog
  ) {
    this.settingsForm = this.buildFormGroup();
  }

  ngOnInit() {
    this.settingsService.loadSettings().subscribe((res) => {
      this.settings = res;
      this.settingsForm.setValue({
        pomodoro: res.pomodoro,
        shortBreak: res.shortBreak,
        longBreak: res.longBreak,
        pomodorosBeforeLongBreak: res.pomodorosBeforeLongBreak,
        autostartEnabled: res.autostartEnabled,
      });
    });
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      Object.assign(this.settings, this.settingsForm.value);
      this.settingsService.saveSettings(this.settings);
      this.matDialog.closeAll();
    }
  }

  private buildFormGroup(): FormGroup {
    return this.formBuilder.group({
      pomodoro: ['', this.settingsValidators],
      shortBreak: ['', this.settingsValidators],
      longBreak: ['', this.settingsValidators],
      pomodorosBeforeLongBreak: ['', this.settingsValidators],
      autostartEnabled: [false],
    });
  }
}

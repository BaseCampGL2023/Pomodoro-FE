import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TrackerSettingsService } from 'src/app/shared-module/tracker/tracker-settings.service';
import { TrackerSettings } from 'src/app/shared-module/tracker/types/tracker-settings';

@Component({
  selector: 'app-settings-pop-up',
  templateUrl: './settings-pop-up.component.html',
  styleUrls: ['./settings-pop-up.component.scss'],
})
export class SettingsPopUpComponent {
  constructor(protected trackerSettings: TrackerSettingsService) {}
  setSettings(){
    this.trackerSettings.setSettings(new TrackerSettings(10, 10, 10, 5, false));
  }
}

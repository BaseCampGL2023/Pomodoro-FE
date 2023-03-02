import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TrackerSettingsService } from 'src/app/shared-module/tracker/tracker-settings.service';

@Component({
  selector: 'app-settings-pop-up',
  templateUrl: './settings-pop-up.component.html',
  styleUrls: ['./settings-pop-up.component.scss'],
})
export class SettingsPopUpComponent {
  constructor(protected trackerSettings: TrackerSettingsService) {}
}

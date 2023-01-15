import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs";

import { TrackerSettings } from "../types/tracker-settings";

@Injectable()
export class TrackerSettingsService{
    private settings = new BehaviorSubject<TrackerSettings>(
        {pomoDuration: 25, longBreak: 15, shortBreak: 5}
        );
    castSettings = this.settings.asObservable();

    editSettings(newSettings: TrackerSettings){
        this.settings.next(newSettings);
    }
}
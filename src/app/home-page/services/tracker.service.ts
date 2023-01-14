import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs";

import { TrackerSettings } from "../types/tracker-settings";

@Injectable()
export class TrackerService{
    
    constructor(){}
    
    private settings = new BehaviorSubject<TrackerSettings>(
        {pomoDuration: 25, longBreak: 15, shortBreak: 5}
        );
        
    castSettings = this.settings.asObservable();

    editSettings(newSettings: TrackerSettings){
        this.settings.next(newSettings);
    }

    private countdownFinished = new BehaviorSubject<boolean>(false);

    castFinished = this.countdownFinished.asObservable();

    emitFinished(done: boolean){
        this.countdownFinished.next(done);
    }
}
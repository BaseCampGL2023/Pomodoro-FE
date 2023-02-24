import { Injectable } from '@angular/core';
import { TrackerSettings } from "../types/tracker-settings";

@Injectable({
    providedIn: 'root'
})
export class TrackerSettingsService {
    private _settings!: TrackerSettings;
    private readonly storageKey = '_pomoTrackerSettings';
  
    constructor() {
        this.load();
    }

    get pomodoro() {
        return this._settings.pomodoro;
    }
    
    get longBreak() {
        return this._settings.longBreak;
    }

    get shortBreak() {
        return this._settings.shortBreak;
    }

    set pomodoro(duration: number) {
        if(duration > 0 && Number.isInteger(duration)){
            this._settings.pomodoro = duration;
            this.save();
        }
    }

    set longBreak(duration: number) {
        if(duration > 0 && Number.isInteger(duration)){
            this._settings.longBreak = duration;
            this.save();
        }
    }

    set shortBreak(duration: number) {
        if(duration > 0 && Number.isInteger(duration)){
            this._settings.shortBreak = duration;
            this.save();
        }
    }
  
    private load(){
      const persisted = localStorage.getItem(this.storageKey);
      if(persisted != null) {
        const settings = JSON.parse(persisted) as TrackerSettings;
        if(settings?.shortBreak > 0 && settings?.longBreak > 0 && settings?.pomodoro > 0){
            this._settings = settings;
            return;
        } else {
            localStorage.removeItem(this.storageKey);
        }
      }
      this._settings = new TrackerSettings();
    }
  
    private save(){
      localStorage.setItem(this.storageKey, JSON.stringify(this._settings));
    }
    
  }
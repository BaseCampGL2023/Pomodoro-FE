import { Injectable } from '@angular/core';
import { TrackerSettings } from './types/tracker-settings';

@Injectable({
  providedIn: 'root',
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
  set pomodoro(duration: number) {
    if (duration > 0 && Number.isInteger(duration)) {
      this._settings.pomodoro = duration;
      this.save();
    }
  }

  get longBreak() {
    return this._settings.longBreak;
  }
  set longBreak(duration: number) {
    if (duration > 0 && Number.isInteger(duration)) {
      this._settings.longBreak = duration;
      this.save();
    }
  }

  get shortBreak() {
    return this._settings.shortBreak;
  }
  set shortBreak(duration: number) {
    if (duration > 0 && Number.isInteger(duration)) {
      this._settings.shortBreak = duration;
      this.save();
    }
  }

  get pomodorosBeforeLongBreak() {
    return this._settings.pomodorosBeforeLongBreak;
  }
  set pomodorosBeforeLongBreak(pomodoros: number) {
    if (pomodoros > 0 && Number.isInteger(pomodoros)) {
      this._settings.pomodorosBeforeLongBreak = pomodoros;
      this.save();
    }
  }

  get autostartEnabled() {
    return this._settings.autostartEnabled;
  }
  set autostartEnabled(state: boolean) {
    this._settings.autostartEnabled = state;
    this.save();
  }

  public setSettings(settings: TrackerSettings) {
    if (this.isSettings(settings)) this._settings = settings;
    this.save();
  }

  private load() {
    const persisted = localStorage.getItem(this.storageKey);
    if (persisted != null) {
      const settings = JSON.parse(persisted) as TrackerSettings;
      if (this.isSettings(settings)) {
        this._settings = settings;
        return;
      } else {
        localStorage.removeItem(this.storageKey);
      }
    }
    this._settings = new TrackerSettings();
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this._settings));
  }

  private isSettings(obj: TrackerSettings): boolean {
    return (
      obj?.shortBreak > 0 &&
      obj?.longBreak > 0 &&
      obj?.pomodoro > 0 &&
      typeof obj?.autostartEnabled == 'boolean' &&
      obj?.pomodorosBeforeLongBreak > 0
    );
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { TrackerSettingsService } from '../tracker/tracker-settings.service';
import { TrackerSettings } from '../tracker/types/tracker-settings';
import { Guid } from '../types/guid';
import { Settings } from '../types/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private trackerSettingsService: TrackerSettingsService
  ) {}

  private readonly settingsIdKey = 'settingsId';
  private readonly userIdKey = 'userId';

  private readonly url = `${environment.baseUrl}settings`;

  loadSettings(): Observable<TrackerSettings> {
    if (
      !this.authService.isAuthenticated() ||
      this.localStorageHasUserSettings()
    ) {
      return this.getFromLocalStorageOrDefault();
    }
    return this.getFromServer();
  }

  saveSettings(trackerSettings: TrackerSettings): void {
    this.saveLocally(trackerSettings);
    if (this.authService.isAuthenticated()) {
      this.saveToServer(trackerSettings).subscribe((settings) => {
        this.saveIdsLocally(settings);
      });
    }
  }

  private localStorageHasUserSettings(): boolean {
    const userId = this.userIdFromLocalStorage();
    return (
      this.trackerSettingsService.isStoredLocal() &&
      userId !== null &&
      userId == this.authService.getUserId()
    );
  }

  private getFromLocalStorageOrDefault(): Observable<TrackerSettings> {
    return of(this.trackerSettingsService.getCurrentSettings());
  }

  private userIdFromLocalStorage(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  private settingsIdFromLocalStorage(): string | null {
    return localStorage.getItem(this.settingsIdKey);
  }

  private saveLocally(trackerSettings: TrackerSettings): void {
    this.trackerSettingsService.setSettings(trackerSettings);
  }

  private saveIdsLocally(settings: Settings): void {
    localStorage.setItem(this.settingsIdKey, settings.id);
    localStorage.setItem(this.userIdKey, settings.userId);
  }

  private getFromServer(): Observable<TrackerSettings> {
    return this.http.get<Settings>(this.url).pipe(
      map((res) => {
        const trackerSettings = this.toTrackerSettings(res);
        this.saveLocally(trackerSettings);
        this.saveIdsLocally(res);
        return trackerSettings;
      }),
      catchError((err: HttpErrorResponse) => {
        return err.status == 404
          ? this.getFromLocalStorageOrDefault()
          : throwError(() => new Error(err.error));
      })
    );
  }

  private saveToServer(trackerSettings: TrackerSettings): Observable<Settings> {
    const userId = this.authService.getUserId();
    const settings = this.toSettings(trackerSettings);

    if (userId == settings.userId) {
      return this.updateResource(settings);
    }

    settings.id = Guid.empty;
    settings.userId = userId;

    return this.createResource(settings);
  }

  private createResource(settings: Settings): Observable<Settings> {
    return this.http.post<Settings>(this.url, settings);
  }

  private updateResource(settings: Settings): Observable<Settings> {
    return this.http.put<Settings>(`${this.url}/${settings.id}`, settings);
  }

  private toTrackerSettings(settings: Settings): TrackerSettings {
    return new TrackerSettings(
      settings.pomodoroDuration,
      settings.longBreak,
      settings.shortBreak,
      settings.pomodorosBeforeLongBreak,
      settings.autostartEnabled
    );
  }

  private toSettings(trackerSettings: TrackerSettings): Settings {
    return new Settings(
      this.settingsIdFromLocalStorage() ?? Guid.empty,
      this.userIdFromLocalStorage() ?? Guid.empty,
      trackerSettings.pomodoro,
      trackerSettings.longBreak,
      trackerSettings.shortBreak,
      trackerSettings.pomodorosBeforeLongBreak,
      trackerSettings.autostartEnabled
    );
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { TrackerSettings } from 'src/app/home-page/types/tracker-settings';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Guid } from '../types/guid';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private readonly settingsKey = 'trackerSettings';
  private readonly url = `${environment.baseUrl}settings`;

  private readonly defaultSettings: TrackerSettings = {
    id: Guid.empty,
    userId: Guid.empty,
    pomodoroDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    pomodorosBeforeLongBreak: 4,
    autostartEnabled: false,
  };

  loadSettings(): Observable<TrackerSettings> {
    if (
      !this.authService.isAuthenticated() ||
      this.localStorageHasUserSettings()
    ) {
      return this.getFromLocalStorageOrDefault();
    }
    return this.getFromServer();
  }

  saveSettings(settings: TrackerSettings): void {
    if (this.authService.isAuthenticated()) {
      this.saveToServer(settings).subscribe((res) => {
        this.saveToLocalStorage(res);
      });
    } else {
      this.saveToLocalStorage(settings);
    }
  }

  private localStorageHasUserSettings(): boolean {
    const settings = this.getFromLocalStorage();
    return settings !== null && settings.userId == this.authService.getUserId();
  }

  private getFromLocalStorageOrDefault(): Observable<TrackerSettings> {
    const settings = this.getFromLocalStorage();
    return settings ? of(settings) : of(this.defaultSettings);
  }

  private getFromLocalStorage(): TrackerSettings | null {
    const settingsJson = localStorage.getItem(this.settingsKey);
    return settingsJson ? JSON.parse(settingsJson) : null;
  }

  private saveToLocalStorage(settings: TrackerSettings) {
    const settingsJson = JSON.stringify(settings);
    localStorage.setItem(this.settingsKey, settingsJson);
  }

  private getFromServer(): Observable<TrackerSettings> {
    return this.http.get<TrackerSettings>(this.url).pipe(
      catchError((err: HttpErrorResponse) => {
        return err.status == 404
          ? this.getFromLocalStorageOrDefault()
          : throwError(() => new Error(err.error));
      })
    );
  }

  private saveToServer(settings: TrackerSettings): Observable<TrackerSettings> {
    const userId = this.authService.getUserId();
    if (settings.userId == userId) {
      return this.updateResource(settings);
    }

    settings.id = Guid.empty;
    settings.userId = userId;

    return this.createResource(settings);
  }

  private createResource(
    settings: TrackerSettings
  ): Observable<TrackerSettings> {
    return this.http.post<TrackerSettings>(this.url, settings);
  }

  private updateResource(
    settings: TrackerSettings
  ): Observable<TrackerSettings> {
    return this.http.put<TrackerSettings>(
      `${this.url}/${settings.id}`,
      settings
    );
  }
}

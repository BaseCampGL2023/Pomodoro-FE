import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './shared-module/nav-menu/nav-menu.component';
import { HomePageComponent } from './home-page/components/home-page/home-page.component';
import { WelcomeMessageComponent } from './home-page/components/welcome-message/welcome-message.component';
import { TrackerComponent } from './home-page/components/tracker/tracker.component';
import { TaskListComponent } from './home-page/components/task-list/task-list.component';
import { TrackerService } from './home-page/services/tracker.service';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginPopUpComponent } from './modals/login-pop-up/login-pop-up.component';
import { SettingsPopUpComponent } from './modals/settings-pop-up/settings-pop-up.component';
import { StatisticsPageComponent } from './statistics-page/components/statistics-page/statistics-page.component';
import { TaskService } from './home-page/services/task.service';
import { DailyStatisticsComponent } from './statistics-page/components/daily-statistics/daily-statistics.component';
import { AnnualStatisticsComponent } from './statistics-page/components/annual-statistics/annual-statistics.component';
import { MonthlyStatisticsComponent } from './statistics-page/components/monthly-statistics/monthly-statistics.component';
import { StatisticsService } from './statistics-page/services/statistics.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomePageComponent,
    WelcomeMessageComponent,
    TrackerComponent,
    TaskListComponent,
    LoginPopUpComponent,
    SettingsPopUpComponent,
    StatisticsPageComponent,
    DailyStatisticsComponent,
    AnnualStatisticsComponent,
    MonthlyStatisticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
  providers: [TrackerService, TaskService, StatisticsService],
  bootstrap: [AppComponent],
})
export class AppModule {}

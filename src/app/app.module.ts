import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './shared-module/nav-menu/nav-menu.component';
import { HomePageComponent } from './home-page/components/home-page/home-page.component';
import { WelcomeMessageComponent } from './home-page/components/welcome-message/welcome-message.component';
import { TrackerComponent } from './home-page/components/tracker/tracker.component';
import { TaskListComponent } from './shared-module/task-list/task-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LoginPopUpComponent } from './modals/login-pop-up/login-pop-up.component';
import { SettingsPopUpComponent } from './modals/settings-pop-up/settings-pop-up.component';
import { StatisticsPageComponent } from './statistics-page/components/statistics-page/statistics-page.component';
import { DailyStatisticsComponent } from './statistics-page/components/daily-statistics/daily-statistics.component';
import { AnnualStatisticsComponent } from './statistics-page/components/annual-statistics/annual-statistics.component';
import { MonthlyStatisticsComponent } from './statistics-page/components/monthly-statistics/monthly-statistics.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskService } from './shared-module/services/task.service';
import { AuthInterceptor } from './shared-module/auth/auth.interceptor';
import { ValidationHelper } from './shared-module/pipes/validation-helper';
import { ValidationErrorsDirective } from './shared-module/directives/validation-errors.directive';
import { TodayTasksComponent } from './home-page/components/today-tasks/today-tasks.component';
import { BarPlotComponent } from './shared-module/bar-plot/bar-plot.component';
import { SignupPopUpComponent } from './modals/signup-pop-up/signup-pop-up.component';
import { PomodoroBadgeDirective } from './shared-module/directives/pomodoro-badge.directive';
import { NewTaskPopUpComponent } from './modals/new-task-pop-up/new-task-pop-up.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    ValidationHelper,
    ValidationErrorsDirective,
    TodayTasksComponent,
    BarPlotComponent,
    SignupPopUpComponent,
    PomodoroBadgeDirective,
    NewTaskPopUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [
    TaskService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

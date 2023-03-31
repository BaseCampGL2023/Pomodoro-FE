import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
import { TaskMenuComponent } from './shared-module/task-menu/task-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { EditTaskPopUpComponent } from './modals/edit-task-pop-up/edit-task-pop-up.component';
import { MatSelectModule } from '@angular/material/select';
import { CompleteTaskPopUpComponent } from './modals/complete-task-pop-up/complete-task-pop-up.component';
import { DeleteTaskPopUpComponent } from './modals/delete-task-pop-up/delete-task-pop-up.component';
import { DatePipe } from '@angular/common';
import { CreateTaskPopUpComponent } from './modals/create-task-pop-up/create-task-pop-up.component';
import { FinishModalComponent } from './home-page/components/finish-modal/finish-modal.component';

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
    TaskMenuComponent,
    EditTaskPopUpComponent,
    CompleteTaskPopUpComponent,
    DeleteTaskPopUpComponent,
    CreateTaskPopUpComponent,
    FinishModalComponent,
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
    MatSlideToggleModule,
    MatMenuModule,
    MatSelectModule,
  ],
  providers: [
    TaskService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    Title,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './shared-module/nav-menu/nav-menu.component';
import { HomePageComponent } from './home-page/components/home-page/home-page.component';
import { WelcomeMessageComponent } from './home-page/components/welcome-message/welcome-message.component';
import { TrackerComponent } from './home-page/components/tracker/tracker.component';
import { TaskListComponent } from './home-page/components/task-list/task-list.component';
import { TrackerService } from './home-page/services/tracker.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomePageComponent,
    WelcomeMessageComponent,
    TrackerComponent,
    TaskListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
  ],
  providers: [TrackerService],
  bootstrap: [AppComponent],
})
export class AppModule {}

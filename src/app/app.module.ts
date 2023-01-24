import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './shared-module/nav-menu/nav-menu.component';
import { HomePageComponent } from './home-page/components/home-page/home-page.component';
import { WelcomeMessageComponent } from './home-page/components/welcome-message/welcome-message.component';
import { TrackerComponent } from './home-page/components/tracker/tracker.component';
import { TrackerService } from './home-page/services/tracker.service';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginPopUpComponent } from './modals/login-pop-up/login-pop-up.component';
import { SettingsPopUpComponent } from './modals/settings-pop-up/settings-pop-up.component';

;
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomePageComponent,
    WelcomeMessageComponent,
    TrackerComponent,
    LoginPopUpComponent,
    SettingsPopUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [TrackerService],
  bootstrap: [AppComponent],
})
export class AppModule {}

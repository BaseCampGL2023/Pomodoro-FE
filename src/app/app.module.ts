import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './shared-module/nav-menu/nav-menu.component';
import { HomePageComponent } from './home-page/components/home-page/home-page.component';
import { WelcomeMessageComponent } from './home-page/components/welcome-message/welcome-message.component';
import { TrackerComponent } from './home-page/components/tracker/tracker.component';

@NgModule({
  declarations: [AppComponent, NavMenuComponent, HomePageComponent, WelcomeMessageComponent, TrackerComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

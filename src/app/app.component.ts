import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from './shared-module/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  defaultTitle = 'Pomodoro';

  constructor(private authService: AuthService, private title: Title) {}

  ngOnInit(): void {
    this.authService.init();
  }
}

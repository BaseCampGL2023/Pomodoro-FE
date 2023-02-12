import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/components/home-page/home-page.component';
import { AuthGuard } from './shared-module/auth/auth.guard';
import { StatisticsPageComponent } from './statistics-page/components/statistics-page/statistics-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'statistics',
    component: StatisticsPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

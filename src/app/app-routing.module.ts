import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/components/home-page/home-page.component';
import { StatisticsPageComponent } from './statistics-page/components/statistics-page/statistics-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'statistics', component: StatisticsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

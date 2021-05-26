import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardTemplateComponent} from "./components/dashboard-template/dashboard-template.component";
import {MainPageComponent} from "./components/main-page/main-page.component";


const routes: Routes = [
  {path: '', redirectTo: 'main-page', pathMatch: 'full'},
  {path: 'dashboard-template/:id', component: DashboardTemplateComponent},
  {path: 'main-page', component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { GridsterModule } from 'angular-gridster2';
import { ChartsModule } from 'ng2-charts';
import { CreateDashboardComponent } from './components/create-dashboard/create-dashboard.component';
import {FormsModule, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { DashboardTemplateComponent } from './components/dashboard-template/dashboard-template.component';
import {MatListModule, MatDialogRef} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import { CreateChartComponent } from './components/create-chart/create-chart.component';
import { LayoutService } from './services/layout.service';
import { UpdatedashboardComponent } from './components/updatedashboard/updatedashboard.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    CreateDashboardComponent,
    DashboardTemplateComponent,
    CreateChartComponent,
    UpdatedashboardComponent,
    ConfirmDialogComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridsterModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ChartsModule,
    FormsModule,
    MatListModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  },
  LayoutService],
  entryComponents: [CreateDashboardComponent,
  CreateChartComponent,
  UpdatedashboardComponent,
  ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatToolbarModule,
  MatDialogModule,
  MatFormField,
  MatSelectModule,
  MatOptionModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatIconModule,
  MatCheckboxModule,
  MatMenuModule,
  MatSlideToggleModule
} from '@angular/material';

const MaterialLibraries = [
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatIconModule,
  MatMenuModule,
  MatSlideToggleModule
];

@NgModule({
  imports: [
    CommonModule,
    MaterialLibraries
  ],
  exports: [
    MaterialLibraries
  ]
})
export class AngularMaterialModule { }

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(message: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'confirm-dialog-class',
      disableClose: true,
      width: '400px',
      data: message
    });
  }


}

import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogContent } from '@angular/material/dialog';


@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<ConfirmationModalComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
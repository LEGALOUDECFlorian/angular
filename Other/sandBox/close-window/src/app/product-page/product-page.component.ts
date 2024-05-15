import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';



@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // ... your component initialization logic ...
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle confirmed purchase (e.g., process payment, redirect to checkout)
        console.log('Purchase confirmed!');
      } else {
        console.log('Purchase canceled.');
      }
    });
  }
}
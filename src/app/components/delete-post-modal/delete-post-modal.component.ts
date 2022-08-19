import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-post-modal',
  templateUrl: './delete-post-modal.component.html',
  styleUrls: ['./delete-post-modal.component.css']
})
export class DeletePostModalComponent {

  /**
   * Constructor
   * 
   * @param dialogRef Reference to the component to be used as a dialog
   */
  constructor(public dialogRef: MatDialogRef<DeletePostModalComponent>) { }

  /**
   * Sends a true to the observer to confirm post deletion
   */
  confirmDelete() {
    this.dialogRef.close(true);
  }
}

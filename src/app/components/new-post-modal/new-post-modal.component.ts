import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-post-modal',
  templateUrl: './new-post-modal.component.html',
  styleUrls: ['./new-post-modal.component.css']
})
export class NewPostModalComponent {

  /**
   * Post like object
   */
  post = {
    title: '',
    userName: '',
    body: ''
  };

  /**
   * Constructor
   * 
   * @param dialogRef The reference to the component to be used as a dialog
   */
  constructor(public dialogRef: MatDialogRef<NewPostModalComponent>) { }

  /**
   * Sends data back to the observer
   */
  public sendData() {
    this.dialogRef.close(this.post);
  }

}

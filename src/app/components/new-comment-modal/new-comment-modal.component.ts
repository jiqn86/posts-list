import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-new-comment-modal',
  templateUrl: './new-comment-modal.component.html',
  styleUrls: ['./new-comment-modal.component.css']
})
export class NewCommentModalComponent {

  newComment: Comment = {};

  /**
   * Constructor
   * 
   * @param dialogRef The ref to the component to be used as a dialog
   */
  constructor(public dialogRef: MatDialogRef<NewCommentModalComponent>) { }

  /**
   * Sends the data to the observer with the new comment
   */
  public sendData() {
    this.dialogRef.close(this.newComment);
  }

}

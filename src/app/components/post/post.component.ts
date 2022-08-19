import { Component, OnInit } from '@angular/core';
import { NewCommentModalComponent } from '../new-comment-modal/new-comment-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  /**
   * Constructor
   * 
   * @param _snackBar To display info messages
   * @param listService To make http requests
   * @param route To handle routes
   * @param dialog To display dialog modals
   */
  constructor(
    private _snackBar: MatSnackBar,
    private listService: ListService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  comments: [Comment] | undefined;
  isEdit = false;
  post: Post | undefined;
  postId: string | null | undefined;
  user: User | undefined;

  /**
   * ng hook
   */
  async ngOnInit(): Promise<void> {
    await this.getIdParam();
    this.initPost();
  }

  /**
   * Gets the comments related to a particular post
   */
  private getComments(): void {
    if (this.post) {
      this.listService.getComments(this.post.id).
        subscribe(
          (comments: [Comment]) => {
            this.comments = comments;
          }
        )
    }
  }

  /**
   * Gets the id of the post from the params and the edit mode
   * 
   * @return Promise<void>
   */
  private async getIdParam(): Promise<void> {
    this.route.paramMap.subscribe(
      paramMap => {
        this.postId = paramMap.get('id');
        this.isEdit = paramMap.get('edit') === 'true' ? true : false;
      });
  }

  /**
   * Gets the owner of the post
   */
  private getUser(): void {
    if (this.post) {
      this.listService.getUser(this.post?.userId).subscribe(
        {
          next: (user: User) => {
            this.user = user;
          },
          error: () => {
            this._snackBar.open('There was an error getting the data, Try again!', 'Dismiss', { duration: 3000 });
          }
        });
    }
  }

  /**
   * Gets the post information
   */
  private initPost(): void {
    this.listService.getPost(String(this.postId)).subscribe(
      {
        next: (post: Post) => {
          this.post = post;
          if (this.post) {
            this.getUser();
            this.getComments();
          }
        },
        error: () => {
          this._snackBar.open('There was an error getting the data, Try again!', 'Dismiss', { duration: 3000 });
        }
      });
  }

  /**
   * Opens a dialog to add a new comment to the post
   */
  public openDialog(): void {
    const dialogRef = this.dialog.open(NewCommentModalComponent, {});

    dialogRef.afterClosed().subscribe(
      {
        next: (comment: Comment) => {
          if (comment && comment.name && comment.email && comment.body) {
            this.comments?.push(comment);
          } else {
            this._snackBar.open('Invalid comment, please fill in all the fields!', 'Dismiss', { duration: 3000 });
          }
        },
        error: () => {
          this._snackBar.open('There was an issue saving your changes, Try again!', 'Dismiss', { duration: 3000 });
        }
      });
  }

  /**
   * Saves the changes made to the post
   */
  public saveBodyChanges(): void {
    this.listService.savePost(this.post).subscribe(
      {
        next: () => {
          this.isEdit = false;
          this._snackBar.open('Changes Saved', 'Dismiss', { duration: 2000 });
        },
        error: () => {
          this._snackBar.open('There was an issue saving your changes, Try again!', 'Dismiss', { duration: 3000 });
        }
      });
  }
}

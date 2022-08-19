import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { ListService } from 'src/app/services/list.service';
import { NewPostModalComponent } from '../new-post-modal/new-post-modal.component';
import { DeletePostModalComponent } from '../delete-post-modal/delete-post-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  dataSource: MatTableDataSource<Post>;
  displayedColumns: string[] = ['id', 'user', 'title', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  /**
   * Constructor
   * 
   * @param listService 
   * @param router 
   * @param _snackBar 
   * @param dialog 
   */
  constructor(
      private listService: ListService,
      private router: Router,
      private _snackBar: MatSnackBar,
      public dialog: MatDialog
    ) {
    this.dataSource = new MatTableDataSource();
  }

  /**
   * ng hook
   */
  ngOnInit(): void {
    this.initTable();
  }

  /**
   * Gets the user information from every post in the list
   * 
   * @return Promise<void>
   */
  private async addUsersToTable(): Promise<void> {
    const repeatedIds: number[] = [];
    this.dataSource.data.forEach(post => repeatedIds.push(post.userId));
    const userIds = repeatedIds.filter((post, position) => {
      return repeatedIds.indexOf(post) === position;
    });

    if (userIds.length > 0) {
      for await (let id of userIds) {
        this.listService.getUser(id).subscribe(
          (user: User) => {
            this.assignUserToPost(user);
          }
        )
      }
    }
  }

  /**
   * Assigns the user to an specific post
   * 
   * @param user The user to assign to a post
   */
  private assignUserToPost(user: User): void {
    this.dataSource.data.map(post => {
      if (post.userId === user.id) {
        post.userName = user.name;
      }
    });
  }

  /**
   * Gets the posts from the service
   */
  private initTable(): void {
    this.listService.getPosts().subscribe(
      (data: [Post]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.addUsersToTable();
      }
    )
  }

  /**
   * Apply the filter to the posts list
   * 
   * @param event The keyboard event
   */
  public applyFilter(event: Event):void  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Navigates to the post edit page with the specific post id
   * 
   * @param postId the id of the post to edit
   */
  public editPost(postId: number): void {
    this.router.navigate([`/post/${postId}`, { edit: true }]);
  }

  /**
   * Opens a modal to confirm the deletion of the post
   * 
   * @param postId The id of the post to delete
   */
  public openDeletePost(postId: number): void {
    const dialogRef = this.dialog.open(DeletePostModalComponent, {});
    dialogRef.afterClosed().subscribe(
      resp => {
        if (resp) {
          this.listService.deletePost(postId).subscribe(
            () => {
              this.dataSource.data = this.dataSource.data.filter(post => post.id !== postId);
              this._snackBar.open('Post Deleted!', 'Dismiss', { duration: 2000 });
            }
          );
        }
      }
    );
  }

  /**
   * Opens a modal to create a new post
   */
  public openDialog(): void {
    const dialogRef = this.dialog.open(NewPostModalComponent, {});

    dialogRef.afterClosed().subscribe(
      post => {
        if (post && post.title !== '' && post.userName !== '' && post.body !== '') {
          this.listService.createPost(post).subscribe(
            (newPost: Post) => {
              this.dataSource.data.push(newPost);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this._snackBar.open('Post Created!', 'Dismiss', { duration: 2000 });
            }
          );
        } else {
          this._snackBar.open('Invalid post, please fill in all the fields!', 'Dismiss', { duration: 3000 });
        }
      }
    )
  }

  /**
   * Navigates to the post page with the specific id
   * 
   * @param postId The id of the post
   */
  public openPost(postId: number): void {
    this.router.navigate([`/post/${postId}`]);
  }
}

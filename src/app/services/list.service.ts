import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { Post } from '../models/post';
import { User } from '../models/user';

const BASE_SERVER_URL = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class ListService {


  constructor(private http: HttpClient) { }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${BASE_SERVER_URL}/posts`, post);
  }
  
  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${BASE_SERVER_URL}/posts/${postId}`);
  }

  getComments(postId: number): Observable<[Comment]> {
    return this.http.get<[Comment]>(`${BASE_SERVER_URL}/comments?postId=${postId}`);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${BASE_SERVER_URL}/posts/${id}`);
  }

  getPosts(): Observable<[Post]> {
    return this.http.get<[Post]>(`${BASE_SERVER_URL}/posts`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${BASE_SERVER_URL}/users/${id}`);
  }

  savePost(post: Post | undefined): Observable<Post> {
    return this.http.put<Post>(`${BASE_SERVER_URL}/posts/${post?.id}`, post);
  }
}

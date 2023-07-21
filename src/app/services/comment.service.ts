import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Comment } from '../models/Comment ';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private apiUrl = environment.apiUrl;
  private CommentUrl = this.apiUrl + '/api/comments';

   getComment (): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.CommentUrl);
  }
  addComment(c: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.CommentUrl, c, this.httpOptions);
  }
  deleteComment(id: number): Observable<Comment> {
    const url = `${this.CommentUrl}/${id}`;
    return this.http.delete<Comment>(url, this.httpOptions);
  }
  updateComment( c: any): Observable<Comment> {
    const url = `${this.CommentUrl}/${c.id}`;
    return this.http.put<Comment>(url, c, this.httpOptions);
  }
  getCommentById(id: number): Observable<Comment> {
    const url = `${this.CommentUrl}/${id}`;
    return this.http.get<Comment>(url);
  }
  
  constructor(    private http: HttpClient) { }
}
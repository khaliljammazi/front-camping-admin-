import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../models/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private apiUrl = environment.apiUrl;
  private postUrl = this.apiUrl + '/api/posts';

   getPost (): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }
  addpost(d: Post): Observable<Post> {
    return this.http.post<Post>(this.postUrl, d, this.httpOptions);
  }
  addpostbyuserancamp(p: Post, id: number): Observable<Post> {
    const url = `${this.postUrl}/${id}`;

    return this.http.post<Post>(url, p, this.httpOptions);
  } 
  deletePost(id: number): Observable<Post> {
    const url = `${this.postUrl}/${id}`;
    return this.http.delete<Post>(url, this.httpOptions);
  }
  updatePost( d: any): Observable<Post> {
    const url = `${this.postUrl}/${d.id}`;
    return this.http.put<Post>(url, d, this.httpOptions);
  }
  getPostById(id: number): Observable<Post> {
    const url = `${this.postUrl}/${id}`;
    return this.http.get<Post>(url);
  }
   getPostsByUserMostComments(iduser: number, limit: number): Observable<Post[]> {
    const url = `${this.postUrl}/most-comments/${iduser}?limit=${limit}`;
    return this.http.get<Post[]>(url);
  }
  
  constructor(    private http: HttpClient) { }
}
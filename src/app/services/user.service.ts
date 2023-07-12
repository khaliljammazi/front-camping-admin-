import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TokenService } from './token.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl+'/api/users/';
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) { }


  /**
   * Returns user By Id
   * Used for auth after closing the site 
   * 
   */
  public get(id: any): Observable<any> {
    return this.httpClient.get<User>(this.url + id);
  }

  
  /**
   * Returns all users
   * 
   */
  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }

  /**
   * Enters User object
   * Return User object moddified
   */
  public update(user: User, id: any): Observable<any> {
    return this.httpClient.put(this.url + id, User);
  }

  // enters Object object
  // Return User object
  public change_mdp(user: {oldpass:String, newpass:String, pass:String}, id: any): Observable<any> {
    return this.httpClient.put(this.url + 'change_mdp/' + id, User);
  }
}

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


  // Return list of Admins
  public get(id: any): Observable<any> {
    return this.httpClient.get<User>(this.url + id);
  }

  // enters User object
  // Return User object
  public update(user: User, id: any): Observable<any> {
    return this.httpClient.put(this.url + id, User);
  }

  // enters Object object
  // Return User object
  public change_mdp(user: {oldpass:String, newpass:String, pass:String}, id: any): Observable<any> {
    return this.httpClient.put(this.url + 'change_mdp/' + id, User);
  }
}

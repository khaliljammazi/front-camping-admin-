import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
    this.nextToken(localStorage.getItem("token"));
  }

  //Token 
  private token = new BehaviorSubject(
    localStorage.getItem("token")
  );
  sharedToken = this.token.asObservable();

  nextToken(new_Token: any) {
    this.token.next(new_Token)
  }

  currentToken() {
    return this.token.value;
  }

  decodedToken() {
    if (this.token.value) {
      var base64Url = this.token.value.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    }
  };

  logOut() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.token.next(null);
  }
}

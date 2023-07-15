import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { User } from "src/app/models/user";
import { TokenService } from "./token.service";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = environment.apiUrl + "/api/auth/";
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  private user = new BehaviorSubject<User>(new User());
  sharedUser = this.user.asObservable();

  nextUser(new_user: any) {
    console.log(new_user);
    
    this.user.next(new_user);
  }

  initializeUser() {
    if (this.tokenService.currentToken()) 
      this.userService
        .get(this.tokenService.decodedToken()?.jti)
        .subscribe((data) => {
          next: {
            this.nextUser(data);
          }
        });
  }

  currentUser() {
    return this.user.value;
  }

  // enters User object
  // Return Token
  public logIn(email: string, password: string): Observable<any> {
    return this.httpClient
      .post<{ token: any; user: any }>(this.url + "login", { email, password })
      .pipe(
        map((res: { token: any; user: any }) => {
          // store jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("token", res.token);
          this.tokenService.nextToken(res.token);
          this.nextUser(res.user);
          return res.token;
        })
      );
  }
  // enters User object
  // Return Token
  public register(user: User): Observable<any> {
    return this.httpClient
      .post<{ token: any; user: any }>(this.url + "register", user)
      .pipe(
        map((res: { token: any; user: any }) => {
          localStorage.setItem("token", res.token);
          this.nextUser(res.user);
          this.tokenService.nextToken(res.token);
          return res.token;
        })
      );
  }
  logOut() {
    this.tokenService.logOut();
    this.nextUser(new User());
  }
}
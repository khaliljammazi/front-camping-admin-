import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { TokenService } from "./token.service";
import { Role, User, UserStat } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private url = environment.apiUrl + "/api/users/";
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  /**
   * Returns user By Id
   * Used for auth after closing the site
   *
   */
  getById(id: number): Observable<User> {
    const url = this.url + id;
    return this.httpClient.get<User>(url);
  }


 getStatsByMonthAndUserId(id: number): Observable<UserStat[]> {
  const url = this.url +"stats-by-date/"+ id;
  return this.httpClient.get<UserStat[]>(url);
}
getStatsBySeasonalActivitiesAndUserId(id: number): Observable<UserStat[]> {
  const url = this.url +"stats-by-season/"+ id;
  return this.httpClient.get<UserStat[]>(url);
}


  /**
   * Returns all users
   *
   */
  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }

  /**
   * Returns all roles
   *
   */
  public getAllRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.url + "roles");
  }

  /**
   * Enters User object
   * Return User object moddified
   */
  public update(user: User, id: any): Observable<any> {
    return this.httpClient.put(this.url + id, user);
  }

  add(user: User): Observable<any> {
    return this.httpClient.post(this.url, user);
  }

  // enters Object object
  // Return User object
  public change_mdp(
    user: { oldpass: String; newpass: String; pass: String },
    id: any
  ): Observable<any> {
    return this.httpClient.put(this.url + "change_mdp/" + id, User);
  }
}

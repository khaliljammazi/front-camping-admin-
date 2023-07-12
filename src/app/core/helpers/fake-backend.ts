import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";
import { User } from "src/app/models/user";

/**
 * @returns registered user list
 */
function getUsers(): User[] {
  // array in session storage for registered users
  let users: User[] = JSON.parse(sessionStorage.getItem("users")!) || [
    {
      id: 1,
      username: "test",
      email: "ubold@coderthemes.com",
      password: "test",
      prenom: "Geneva",
      nom: "Kennedy",
      avatar: "assets/images/users/user-1.jpg",
      location: "California, USA",
      title: "Admin Head",
    },
  ];
  return users;
}

let users: User[] = getUsers();

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authHeader = request.headers.get("Authorization");
    const isLoggedIn =
      authHeader && authHeader.startsWith("Bearer fake-jwt-token");

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(
        mergeMap(() => {
          let temp: User[] = [];
          // authenticate - public
          if (request.url.endsWith("/api/login") && request.method === "POST") {
            const user = users.find(
              (x) =>
                x.email === request.body.email &&
                x.password === request.body.password
            );
            if (!user) {
              return error("Email or password is incorrect");
            }
            return ok({
              ...user,
              name: user.prenom + " " + user.nom,
              token: `fake-jwt-token`,
            });
          }

          // store new user - public
          if (
            request.url.endsWith("/api/signup") &&
            request.method === "POST"
          ) {
            const user = users.find(
              (x) =>
                x.email === request.body.email &&
                x.password === request.body.password
            );
            if (user) {
              return error("User Already Exists");
            } else {
              let [prenom, nom] = request.body.name.split(" ");
              const newUser: User = {
                id: users.length + 1,
                username: prenom,
                email: request.body.email,
                password: request.body.password,
                prenom: prenom,
                nom: nom,
                avatar: "assets/images/users/avatar-5.jpg",
                roles: [{ name: "Admin" }],
              };
              temp = [...users];
              temp.push(newUser);
              [...users] = temp;

              sessionStorage.setItem("users", JSON.stringify(users));
              return ok();
            }
          }

          // get all users
          if (request.url.endsWith("/api/users") && request.method === "GET") {
            if (!isLoggedIn) {
              return unauthorised();
            }
            return ok(users);
          }

          // pass through any requests not handled above
          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    // private helper functions
    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorised() {
      return throwError({ status: 401, error: { message: "Unauthorised" } });
    }

    function error(message: any) {
      return throwError({ status: 400, error: { message } });
    }
  }
}

export let FakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};

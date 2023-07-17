import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { TokenService } from "src/app/services/token.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Role } from "src/app/models/user";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 403) {
          // auto logout if 403 response returned from api
          const decodedToken = this.tokenService.decodedToken();
          this.authService.logOut();
          this.router.navigate(["/auth/signin-signup"]);
          if (!!this.tokenService.currentToken()) {
            Swal.fire({
              title: "Error",
              text: "Token expired or invvalid",
              icon: "error",
            });
          }
          if (
            decodedToken &&
            decodedToken.roles &&
            decodedToken.roles.filter((t: Role) => t.name?.includes("ADMIN"))
              .length > 0
          ) {
            this.router.navigate(["/auth/login"]);
          } else this.router.navigate(["/auth/signin-signup"]);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}

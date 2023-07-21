import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { Role } from "src/app/models/user";
import { TokenService } from "src/app/services/token.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.tokenService.currentToken();
    const decodedToken = this.tokenService.decodedToken();

    if (
      token &&
      decodedToken.roles &&
      decodedToken.roles.filter((t: Role) => t.name?.includes("ADMIN")).length >
        0
    ) {
      // logged in as asmin so return true
      return true;
    }
    Swal.fire({
      title: "Error",
      text: "Unauthorized access",
      icon: "error",
    });

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/auth/login"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}

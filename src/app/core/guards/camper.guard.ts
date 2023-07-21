import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CamperGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.tokenService.currentToken();
    const decodedToken= this.tokenService.decodedToken();
    if (token && decodedToken.roles.length!=0) {
      // logged in so return true
      return true;
    }
    
    Swal.fire({
      title: "Error",
      text: "Unauthorized access",
      icon: "error",
    });

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/signin-signup'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Role } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-auth-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent implements OnInit {
  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authenticationService.isAdmin())
      this.router.navigate(["/"]);
    this.authenticationService.logOut();
  }
}

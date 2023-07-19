import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  loggedInUser!: User;

  constructor(private route: ActivatedRoute, private authSer: AuthService) {}

  ngOnInit(): void {
    this.authSer.sharedUser.subscribe((data) => {
      next: this.loggedInUser = data;
    });
  }
  logout() {
    this.authSer.logOut();
    console.log("hey");
  }
  get isAdmin(): Boolean {
    return this.authSer.isAdmin();
  }
}

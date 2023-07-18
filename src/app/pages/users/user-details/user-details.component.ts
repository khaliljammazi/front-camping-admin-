import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { BreadcrumbItem } from "src/app/shared/page-title/page-title.model";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"],
})
export class UserDetailsComponent implements OnInit {
  user: User = new User();
  pageTitle: BreadcrumbItem[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pageTitle = [{ label: "User details", path: "/", active: true }];

    this.userService.getById(this.route.snapshot.params.id).subscribe({
      next: (data: User) => {
        this.user = data;
      },
    });
  }

}

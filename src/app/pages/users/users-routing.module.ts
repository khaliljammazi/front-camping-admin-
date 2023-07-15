import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListUsersComponent } from "./list-users/list-users.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { AddUserComponent } from "./add-user/add-user.component";

const routes: Routes = [
  { path: "", component: ListUsersComponent },
  {
    path: "add",
    component: AddUserComponent
  },
  {
    path: "update/:id",
    component: UpdateUserComponent
  },
  {
    path: "view/:id",
    component: UserDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { HomeDefaultComponent } from "./home/home-default.component";


const routes: Routes = [
  {
    path: "",
    component: HomeDefaultComponent,
    data: {
      title: "Dashboard",
      header: "Dashboard",
    },
  },      
  {
    path: "change-password",
    component: ChangePasswordComponent,
    data: {
      title: "Change Password",
      header: "Change Password",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

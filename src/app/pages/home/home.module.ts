import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeDefaultComponent } from "./home/home-default.component";
import { NgxEchartsModule } from "ngx-echarts";
import { SharedComponentsModule } from "src/app/shared/components/shared-components.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { NavTitleService } from "src/app/shared/services/nav-title.service";
import { UserLoopUpService } from "src/app/shared/services/user-detail.service";

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    NgbModule,
  ],
  declarations: [HomeDefaultComponent, ChangePasswordComponent],
  providers: [NavTitleService, UserLoopUpService],
})
export class HomeModule {}

import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxPaginationModule } from "ngx-pagination";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { SharedComponentsModule } from "src/app/shared/components/shared-components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { NumberAcceptModule } from "src/app/shared/validation-directives/validation.module";
import { RefundComponent } from "../modals/refund/refund.component";
import { ReportsRoutingModule } from "./reports-routing.module";
import { TransactionReportComponent } from "./transaction-report/transaction-report.component";
import { MatTableResponsiveModule } from "src/app/shared/mat-table-response-directive/mat-table-responsive.module";

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    NgxDatatableModule,
    NgbModule,
    ReportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatTableModule,
    MatIconModule,
    SelectDropDownModule,
    MatSelectModule,
    NumberAcceptModule,
    SharedModule,
    MatPaginatorModule,
    ScrollingModule,
    MatTableResponsiveModule,
  ],
  exports: [MatTableResponsiveModule],
  declarations: [
    TransactionReportComponent,
    RefundComponent,
  ],
})
export class ReportsModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TransactionReportComponent } from "./transaction-report/transaction-report.component";

const routes: Routes = [
  {
    path: "",
    component: TransactionReportComponent,
    data: {
      title: "Account Statement",
      header: "Account Statement",
    },
  },
  {
    path: "transaction-report",
    component: TransactionReportComponent,
    data: {
      title: "Account Statement",
      header: "Account Statement",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}

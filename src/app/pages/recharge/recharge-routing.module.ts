import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RechargeComponent } from './recharge/recharge.component';

const routes: Routes = [
  {
    path: "",
    component:RechargeComponent,
    data: {
      title: "Bill Payments",
      header: "Bill Payments",
      // urls: [{ title: 'Home'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}]
    },
  },
  {
    path:"recharge",
    component:RechargeComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RechargeRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantComponent } from './merchant/merchant.component';

const routes: Routes = [
{
  path:"",
  component:MerchantComponent,
  data: {
    title: "Merchant Onboarding",
    header: "Merchant Onboarding",
    // urls: [{ title: 'Home'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}]
  },
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule { }

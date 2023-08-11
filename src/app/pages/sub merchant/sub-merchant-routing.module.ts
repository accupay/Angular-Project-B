import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubMerchantComponent } from './sub-merchant/sub-merchant.component';

const routes: Routes = [
{
  path:"",
  component:SubMerchantComponent,
  data: {
    title: "Sub-Merchant Onboarding",
    header: "Sub-Merchant Onboarding",
    // urls: [{ title: 'Home'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}]
  },
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SUbMerchantRoutingModule { }

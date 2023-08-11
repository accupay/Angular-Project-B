import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantComponent } from '../merchant/merchant/merchant.component';
import { StaticQRComponent } from './static_qr/static_qr.component';
// import { MerchantComponent } from './merchant/merchant.component';

const routes: Routes = [
{
  path:"",
  component:StaticQRComponent,
  data: {
    title: "Static QR",
    header: "Static QR",
    // urls: [{ title: 'Home'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}]
  },
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticQRRoutingModule { }

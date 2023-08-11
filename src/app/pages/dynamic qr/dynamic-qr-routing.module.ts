import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicQRComponent } from './dynamic_qr/dynamic_qr.component';

const routes: Routes = [
{
  path:"",
  component:DynamicQRComponent,
  data: {
    title: "Dynamic QR",
    header: "Dynamic QR",
    // urls: [{ title: 'Home'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}]
  },
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicQRRoutingModule { }

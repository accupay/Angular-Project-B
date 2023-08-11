import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyVPAComponent } from './verify-vpa/verify_VPA_component';

const routes: Routes = [
{
  path:"",
  component:VerifyVPAComponent,
  data: {
    title: "Transaction with Verify VPA",
    header: "Transaction with Verify VPA",
    // urls: [{ title: 'Home'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}]
  },
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyVPARoutingModule { }

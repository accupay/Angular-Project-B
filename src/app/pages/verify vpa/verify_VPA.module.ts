import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { MerchantRoutingModule } from './merchant-routing.module';
// import { MerchantComponent } from './merchant/merchant.component';
import { SharedComponentsModule } from "src/app/shared/components/shared-components.module";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "src/app/shared/shared.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { SelectDropDownModule } from "ngx-select-dropdown";
import { VerifyVPAComponent } from './verify-vpa/verify_VPA_component';
import { VerifyVPARoutingModule } from './verify_VPA_routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [VerifyVPAComponent],
  imports: [
    CommonModule,
    VerifyVPARoutingModule,
    MatIconModule,
    MatPaginatorModule,
    SharedComponentsModule,
    NgbModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    SelectDropDownModule,
    MatInputModule,
    MatFormFieldModule,
    
  ]
})
export class VerifyVPAModule { }

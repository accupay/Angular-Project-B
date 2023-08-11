import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MerchantRoutingModule } from './merchant-routing.module';
import { MerchantComponent } from './merchant/merchant.component';
import { SharedComponentsModule } from "src/app/shared/components/shared-components.module";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "src/app/shared/shared.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { SelectDropDownModule } from "ngx-select-dropdown";


@NgModule({
  declarations: [MerchantComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    MatIconModule,
    MatPaginatorModule,
    SharedComponentsModule,
    NgbModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    SelectDropDownModule
    
  ]
})
export class MerchantModule { }

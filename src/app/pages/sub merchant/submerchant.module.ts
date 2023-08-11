import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedComponentsModule } from "src/app/shared/components/shared-components.module";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "src/app/shared/shared.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { SelectDropDownModule } from "ngx-select-dropdown";
import { SUbMerchantRoutingModule } from './sub-merchant-routing.module';
import { SubMerchantComponent } from './sub-merchant/sub-merchant.component';


@NgModule({
  declarations: [SubMerchantComponent],
  imports: [
    CommonModule,
    SUbMerchantRoutingModule,
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
export class SubMerchantModule { }

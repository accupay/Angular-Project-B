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
import { StaticQRComponent } from './static_qr/static_qr.component';
import { StaticQRRoutingModule } from './staticQR-routing.module';

// import { QrcodeRoutingModule } from './qrcode-routing.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';
// import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { QrcodeComponent } from './qrcode.component';
// import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [StaticQRComponent],
  imports: [
    CommonModule,
    StaticQRRoutingModule,
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
    CommonModule,
    // QrcodeRoutingModule,
    NgxQRCodeModule,
    FormsModule,
    ReactiveFormsModule,
    // QRCodeModule
    
  ]
})
export class StaticQRModule { }

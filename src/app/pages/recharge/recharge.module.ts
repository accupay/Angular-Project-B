import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RechargeRoutingModule } from './recharge-routing.module';
import { RechargeComponent } from './recharge/recharge.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from "ngx-select-dropdown";
import {MatListModule} from '@angular/material/list';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from 'src/filter.pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [RechargeComponent,FilterPipe],
  imports: [
    CommonModule,
    RechargeRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    MatListModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatTabsModule
   
  ]
})
export class RechargeModule { }

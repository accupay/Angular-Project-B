import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FlightRoutingModule } from './flight-routing.module';
import { FlightComponent } from './flight/flight.component';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';







@NgModule({
  declarations: [FlightComponent],
  imports: [
    CommonModule,
    FlightRoutingModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    NgxDatatableModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTabsModule,
    MatExpansionModule,
    
  ]
})
export class FlightModule { }

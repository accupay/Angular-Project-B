import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashCollectionRoutingModule } from './cash-collection-routing.module';
import { CashCollectionComponent } from './cash-collection/cash-collection.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from "ngx-select-dropdown";
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [CashCollectionComponent],
  imports: [
    CommonModule,
    CashCollectionRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,ReactiveFormsModule,
    SelectDropDownModule,
    MatListModule,
    MatAutocompleteModule
  ]
})
export class CashCollectionModule { }

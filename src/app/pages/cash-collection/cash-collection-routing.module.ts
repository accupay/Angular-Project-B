import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashCollectionComponent } from './cash-collection/cash-collection.component';

const routes: Routes = [
  {
    path: "",
    component: CashCollectionComponent,
    data:{
        title: "CashCollection",
        hearder: "CashCollection",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashCollectionRoutingModule { }

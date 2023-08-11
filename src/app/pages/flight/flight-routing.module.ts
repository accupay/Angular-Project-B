import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightComponent } from './flight/flight.component';

const routes: Routes = [
  {
    path: "",
    component: FlightComponent,
    data: {
      title: "Flight",
      header: "Flight",
      // urls: [{ title: 'Home'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}]
    },
  },
  {
    path: "flight",
    component: FlightComponent,
    data: {
      title: "Flight",
      header: "Flight",
      // urls: [{ title: 'Home'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}, {title: 'Money Transfer'}]
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }

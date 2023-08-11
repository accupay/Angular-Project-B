import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  onway: boolean = true;
  roundtrip: boolean = false;
  returndate = true;
  FlightList: boolean = false;
  toDate = new Date();
  minDate: Date;
  maxDate: Date;
  adultnumber: number = 1;
  childnumber:number =0;
  infantnumber: number = 0;
  panelOpenState = false;
  cabinclass: any = "Economy";
  fromDate = new FormControl(new Date());
  constructor() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear - 0, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  
   }

  ngOnInit(): void {
  }

  travels: string[] = ['Economy', 'Premium Economy', 'Business Class'];
  checkValue(data) {
    debugger;
    console.log(data.value);
     this.cabinclass = data.value;
  }
 
  adult(value: any) {
    debugger;
    if(this.adultnumber> 0 && value =="max"){
      this.adultnumber +=1;
    }else if(this.adultnumber>1 && value == "min"){
      this.adultnumber -=1;
    }
    
  }

  child(value : any) {
    debugger;
    if(value == "max"){
      this.childnumber +=1;
    }
    else if(this.childnumber>0 &&value == "min"){
      this.childnumber -=1;
    }
  
  }
  searchflight(){
    debugger;
    this.FlightList = true;
  }
   infant(value: any) {
     debugger;
     if(value == "max"){
      this.infantnumber +=1;
     }
     else if(this.infantnumber>0 && value =="min"){
      this.infantnumber -=1;
     }
   }
   closepanel(){
    debugger;
    this.panelOpenState = false;
   }
   
  
}

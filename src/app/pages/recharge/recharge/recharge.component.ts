import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators,ValidatorFn,AbstractControl, FormGroupDirective, NgForm } from "@angular/forms";
import {Observable} from 'rxjs';
import { PeriodicElement } from '../../reports/transaction-report/transaction-report.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {map, startWith} from 'rxjs/operators';
import {
  ResolveEnd,
  ResolveStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from "@angular/router";
import { timeStamp } from 'console';
import { da } from 'date-fns/locale';


function autocompleteStringValidator(validOptions: Array<string>): ValidatorFn {
  debugger;
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (validOptions.indexOf(control.value) !== -1) {
      return null  /* valid option selected */
    }
    return { 'invalidAutocompleteString': { value: control.value } }
  }
}
@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss']
})
export class RechargeComponent implements OnInit {
  
  noRecordFlag: boolean = true;
  cardone: boolean = false;
  rechargeplans: PeriodicElement[] = [];
  customerBeneficiaries = [];
  rechargeForm: FormGroup;
  selectterms;
  searchText: string;
  listservice:any;
  labelname: any;
  records =[];
  selectbiller: boolean = false;
  matgroup: any;
 
  billers: string[] =[
    'andhra Pragathi Grameena Bank Loan Repayment',
    'aris Capital Pvt Limited',
    'arman Financial Services Limited',
    'ascend Capital',
    'ashvFinance',
    'avanti Finance Private Limited',
    'axis Bank Ltd - MCA',
    'capital India Home Loans Limited'


]
  filteredOptions: Observable<string[]>;
  biller = new FormControl('',{ validators: [autocompleteStringValidator(this.billers), Validators.required] });
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (
        event instanceof RouteConfigLoadStart ||
        event instanceof ResolveStart
      ) {
       

       // this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        //this.loading = false;
      }
    });
    this.filteredOptions = this.biller.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
   
    this.initLoginForm();
    }
    
    public initLoginForm(): void {
    this.rechargeForm = new FormGroup({

      //mobile_no: new FormControl("", [Validators.required, Validators.maxLength(10)]),
      selectservice: new FormControl("", [Validators.required]),
      mobile_no: new FormControl("", [Validators.required]),
      location: new FormControl("", [Validators.required]),
      biller:new FormControl("", [Validators.required]),
      bpnumber:new FormControl("", [Validators.required]),
      billid:new FormControl("", [Validators.required]),

      bookingid:new FormControl("", [Validators.required]),

      identitynumber:new FormControl("", [Validators.required]),

    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.billers.filter(option => option.toLowerCase().includes(filterValue));
  }

  service: string[] = [
    'ELECTRICITY',
    'MOBILEPOSTPAID',
    'WATER',
    'GAS',
    'LIFEINSURANCE',
    
  ];
  BillerConfig = {
    displayKey: "name",
    value: "id",
    limitTo: 2  ,
    placeholder: "Select Billers",
    noResultsFound: "No data found!",
    search: true,
    
    
  };

  BillerList = [
    {
      id: 1,
      name: "Alfastar India Nidhi Limited",
    },
    {
      id: 2,
      name: "Andhra Pragathi Grameena Bank Loan Repayment",
    },
    {
      id: 3,
      name: "Arman Financial Services Limited",
    },
  ];
  
  SearchFilter(event: any) {
    
  }
  selectvalue(data){
    debugger;
    this.selectterms = data;
      this.selectionChange(this.selectterms);
        
 
  }
  selectionChange(listservice){
  
  console.log(listservice);
  console.log(listservice.value);


  }


  selectNext(data , el , mobdata){
  
    if(data && mobdata.length===10){
    this.matgroup = el;
    console.log("hiii")
    el.selectedIndex += 1;
    }
   
    
  }
  billerselect(event : any, el){
    debugger;
    
  if(event.option.value =='ashvFinance'){
    this.labelname = "BpNumber"
    window.scrollTo(0,document.body.scrollHeight);
    el.selectedIndex += 1;
  }
  else if(event.option.value == 'axis Bank Ltd - MCA'){
    this.labelname = "Booking Id"
    window.scrollTo(0,document.body.scrollHeight);
    el.selectedIndex += 1;
  }
  else if(event.option.value == 'andhra Pragathi Grameena Bank Loan Repayment'){
    this.labelname = "Bill Id"
    window.scrollTo(0,document.body.scrollHeight);
    el.selectedIndex += 1;
  }
  else if(event.option.value == 'aris Capital Pvt Limited'){
    this.labelname = 'Unique Identification No'
    window.scrollTo(0,document.body.scrollHeight);
    el.selectedIndex += 1;
  }
  }  
  
 
  setValid(controlName: string) {

    this.rechargeForm.controls[controlName].markAsPristine();
    this.rechargeForm.controls[controlName].markAsUntouched();
  }
  setError(controlName: string) {

    this.rechargeForm.controls[controlName].markAsDirty();
    this.rechargeForm.controls[controlName].markAsTouched();
  }

  public myError = (controlName: string, errorName: string) => {
    return this.rechargeForm.controls[controlName].hasError(errorName);
  }

}

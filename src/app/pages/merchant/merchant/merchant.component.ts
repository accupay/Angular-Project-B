import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  ResolveEnd,
  ResolveStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from "@angular/router";
import { ResponseInterface } from "src/app/shared/interface";
import { CacheService } from "src/app/shared/services/cache-service";
import { MatTabChangeEvent } from '@angular/material/tabs';
import { EncrDecrService } from "src/app/shared/services/encr-decr.service";
import { environment } from "src/environments/environment";
import { Customer } from "../../store/customer/customer.model";
import Swal from 'sweetalert2';

interface IOnboarding {
  
 
  merchantname: string;
  businessname: string;
  location: string;
  address1: string;
  country: any;
  state: string;
  city: string;
  pincode: string;
  category: any;
  pan: any;
  mer_business_type: any;
  transactioncount: string;
  transactionamount: string;
  transactionlimit: string;
  vpa: string;
  gstno: string;
  mobile_no: string;
  weburl: string;
 



    // "merchant_legal_name": "string",
    // "business_name": "string",
    // "location": "string",
    // "address": "string",
    // "location_country": "string",
    // "city": "string",
    // "state": "string",
    // "postal_code": "string",
    // "merchant_category": 0,
    // "pan_no": "string",
    // "mer_business_type": 0,
    // "perday_trans_count": 0,
    // "perday_trans_imit": "string",
    // "per_trans_limit": "string",
    // "vpa": "string",
    // "gst_no": "string",
    // "mobile_no": "string",
    // "web_app_url": "string",
    // "user_ref_id": 0

  }

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {
  activeId = 1;
  loading: boolean;
  
  loadingText = "Proceed";
  selectedIndex: number;
  merchantregistration!: FormGroup;
  retailerRefId = "";
  retailerMobileNo = "";
  pincodepattern = "[1-9][0-9]{5}"
  pancardpattern = "[A-Z]{5}[0-9]{4}[A-Z]{1}"
  mobnumPattern = "[0-9]{10}"
  gstnumpattern = "[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
  userRefId = '';
  userMobileNo = '';
  currentlocation: any;
  
  user: IOnboarding;
  CatrgoryConfig = {
    displayKey: "merchant_description",
    value: "merchant_ref_id",
    limitTo: 286,
    placeholder: "Select Category",
    noResultsFound: "No Category found!",
    search : true,
    
  };
  CategoryList = [];

  BusinessConfig = {
    displayKey: "industry_name",
    value: "industry_ref_id",
    limitTo: 13,
    placeholder: "Select BusinessType",
    noResultsFound: "No Type found!",
    search : true,
    
  };
  BusinessType = [
    {
      id: 1,
      country: "India",
    },
    
    
  ];

  CountryConfig = {
    displayKey: "name",
    value: "id",
    limitTo: 3,
    placeholder: "Select Country",
    noResultsFound: "No data found!",
    
    
  };

  CountryList = [
    {
      id: 1,
      name: "India",
    },
    {
      id: 2,
      name: "US",
    },
    {
      id: 3,
      name: "UK",
    },
  ];
  
  StateConfig = {
    displayKey: "state",
    value: "location_ref_id",
    limitTo: 2,
    placeholder: "Select state",
    noResultsFound: "No data found!",
    
    
  };
  StateList = [
   
    
  ];
  CityConfig = {
    displayKey: "district",
    value: "location_ref_id",
    limitTo: 2,
    placeholder: "Select city",
    noResultsFound: "No data found!",
    
    
  };

  CityList = [
    
    
  ];
  locationConfig = {
    displayKey: "sub_district",
    value: "location_ref_id",
    limitTo: 2,
    placeholder: "Select city",
    noResultsFound: "No data found!",
    
    
  };
  locationList =[];
  
  areaList = [];

  selectedcategory : number;
 

  constructor(
    private router: Router,
    private cacheService: CacheService,
    private EncrDecr: EncrDecrService
  ) { 
    this.user = {} as IOnboarding;
    const userInfo = this.EncrDecr.decryptJson(
      sessionStorage.getItem(environment.retailerDatakey)
    ) as Customer;
    this.userRefId = userInfo?.account_refid;
    this.userMobileNo = userInfo?.account_mobile_no;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (
        event instanceof RouteConfigLoadStart ||
        event instanceof ResolveStart
      ) {
        this.loadingText = "Loading Dashboard Module...";

        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });
    this.initLoginForm();
    this.categortList();
    this.businessList();
   
    // this.merchantapi();
  }

    public initLoginForm(): void {
      this.merchantregistration = new FormGroup({
       
        merchantname: new FormControl("", [Validators.required]),
        
        businessname: new FormControl("", [Validators.required]),
        location: new FormControl("", [
          Validators.required,
         
        ]),
        address1: new FormControl("", [Validators.required]),
        country: new FormControl("", [Validators.required]),
        state: new FormControl("", [Validators.required]),
        city: new FormControl("", [Validators.required]),
        pincode:  new FormControl("", [Validators.required,Validators.pattern(this.pincodepattern)]),
        category:  new FormControl("", [Validators.required]),
        pan:  new FormControl("", [Validators.required,Validators.pattern(this.pancardpattern)]),
        mer_business_type:  new FormControl("", [Validators.required]),
        
        transactioncount: new FormControl("", [Validators.required]),
        transactionamount: new FormControl("",[Validators.required]),
      
        transactionlimit:  new FormControl("",[Validators.required]),
        vpa:  new FormControl("",[Validators.required]),
        gstno: new FormControl("",[Validators.required,Validators.pattern(this.gstnumpattern)]),
        mobile_no: new FormControl("",[Validators.required,Validators.pattern(this.mobnumPattern)]),
        weburl:  new FormControl("",[Validators.required]),
       
       
        
        
      });
    }
    categortList(){
      console.log("enter in")
      const categoryparams = {
      
      };
      this.cacheService.getCategoryList(categoryparams).subscribe(
        (res: ResponseInterface) => {
          if (res.response_code === "200") {
            console.log("success")
            if (res.data.length) {
              this.CategoryList = res.data.map((category) => {
                return {
                  merchant_description: category?.merchant_description,
                  merchant_ref_id: category?.merchant_ref_id,
                  
                };
              });
            }


          }
        });
    }
    businessList(){
      console.log("enter in")
      const categoryparams = {
      
      };
      this.cacheService.getbusinessList(categoryparams).subscribe(
        (res: ResponseInterface) => {
          if (res.response_code === "200") {
            console.log("success")
            if (res.data.length) {
              this.BusinessType = res.data.map((type) => {
                return {
                  industry_ref_id: type?.industry_ref_id,
                  industry_name: type?.industry_name,
                  
                  
                };
              });
            }


          }
        });
    }
    pinCodeSubmit(value: any) {
      if (value.length === 6) {
        debugger;
        const authCheckParam = {
          pincode: value,
        };
        this.cacheService.getPinCodeApi(authCheckParam).subscribe(
          (res: ResponseInterface) => {
            if (res.response_code === "200") {
              this.areaList = res.data;
              this.StateList = [this.areaList?.length ? this.areaList[0] : []];
              this.CityList = [this.areaList?.length ? this.areaList[0] : []];
              this.locationList = [this.areaList?.length ? this.areaList[0] : []];
              // for(var i = 0, len = this.CityList.length; i < len; i++) 
              // {
              //      this.currentlocation = this.CityList[i].sub_district; //Would give you the id of each client
              // }
            }
          },
          (err) => {
            if (err.error.response_code === "101") {
            }
          }
        );
      }
    }
    
    merchantRegitrationSubmit() {
      debugger;
      
      if (this.merchantregistration.invalid) {
        for (const control of Object.keys(
          this.merchantregistration.controls
        )) {
          this.merchantregistration.controls[control].markAsTouched();
        }
        return;
      }
      this.user = this.merchantregistration.value;
    
      const merchantdata = {
        merchant_legal_name: this.user.merchantname,
        business_name: this.user.businessname,
        location: this.areaList.length ? this.areaList[0].sub_district : "",
        address: this.user.address1,
        location_country: this.user?.country?.name,
        city : this.areaList.length ? this.areaList[0].district : "",
        state: this.areaList.length ? this.areaList[0].state : "",
        postal_code: this.user.pincode,
        merchant_category:this.user?.category?.merchant_ref_id,
        pan_no:this.user.pan,
        mer_business_type: this.user?.mer_business_type?.industry_ref_id,
        perday_trans_count: this.user.transactioncount,
        perday_trans_imit: this.user.transactionamount,
        per_trans_limit: this.user.transactionlimit,
        vpa: this.user.vpa,
        gst_no: this.user.gstno,
        mobile_no: this.user.mobile_no,
        web_app_url: this.user.weburl,
        user_ref_id: this.userRefId,
       
      };
      this.cacheService.getmerchantregistration(merchantdata).subscribe(
        (res: ResponseInterface) => {
          if (res.response_code === "200") {

            Swal.fire({  
              title: 'Success',  
              text: '',  
              icon: 'success',  
              
            })
            console.log("success merchant")
          }
          else {
            Swal.fire({  
              icon: 'error',  
              title: 'Oops...',  
              text: 'Something went wrong!',  
              footer: ''  
            })  

            
          }
      },
      (err) => {
       
        this.loading = false;
      }
      );



    }
    selectcategory(event: any){
      console.log("enter in")

      this.selectedcategory = event?.value?.merchant_ref_id;
    
    }
   

selectNext(el){
  console.log("hiii")
  el.selectedIndex += 1;
 
  
}
 

selectpre(al){

 al.selectedIndex -= 1;
}
get merchantname() {
  return this.merchantregistration.get("merchantname")!;
}


get businessname() {
  return this.merchantregistration.get("businessname")!;
}
 get location() {
  return this.merchantregistration.get("location")!;
}
get address1() {
  return this.merchantregistration.get("address1")!;
}
get country() {
  return this.merchantregistration.get("country")!;
}
get state() {
  return this.merchantregistration.get("state")!;
}
get city() {
  return this.merchantregistration.get("city")!;
}
get pincode() {
  return this.merchantregistration.get("pincode")!;
}
get category() {
  return this.merchantregistration.get("category")!;
}
get pan() {
  return this.merchantregistration.get("pan")!;
}
get mer_business_type() {
  return this.merchantregistration.get("mer_business_type")!;
}
get transactioncount() {
  return this.merchantregistration.get("transactioncount")!;
}
get transactionamount() {
  return this.merchantregistration.get("transactionamount")!;
}
get transactionlimit() {
  return this.merchantregistration.get("transactionlimit")!;
}
get vpa() {
  return this.merchantregistration.get("vpa")!;
}
get gstno() {
  return this.merchantregistration.get("gstno")!;
}

get mobile_no() {
  return this.merchantregistration.get("mobile_no")!;
}
get weburl () {
  return this.merchantregistration.get("weburl")!;
}

}

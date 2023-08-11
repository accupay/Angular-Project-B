import { ViewEncapsulation } from "@angular/compiler/src/core";
//import { HttpClient } from "@angular/common/http";
import {
  Component,
  HostBinding,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { EncrDecrService } from "src/app/shared/services/encr-decr.service";
import { NavTitleService } from "src/app/shared/services/nav-title.service";
import { ProductService } from "src/app/shared/services/product.service";
import { UserLoopUpService } from "src/app/shared/services/user-detail.service";
import { environment } from "src/environments/environment";
import { echartStyles } from "../../../shared/echart-styles";
import { CacheService } from "src/app/shared/services/cache-service";
import { Store } from "@ngrx/store";
import { CustomerState } from "../../store/customer/customer.reducer";
import { Customer } from "../../store/customer/customer.model";
import {
  ResolveEnd,
  ResolveStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from "@angular/router";
import { DmtService } from "src/app/shared/services/dmt.service";
import { ResponseInterface } from "src/app/shared/interface";
import { AuthService } from "../../../shared/services/auth.service";
import { isSuccess } from "angular-in-memory-web-api";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";


@Component({
  selector: "app-home-default",
  templateUrl: "./home-default.component.html",
  styleUrls: ["./home-default.component.scss"],
})
export class HomeDefaultComponent implements OnInit {
  retailerRefId = "";
  retailerMobileNo = "";
  total_merchants = "";
  total_submerchants = "";
  current_month_added_merchants = "";
  current_month_added_submerchant = "";
  total_transaction_count = "";
  total_transaction_values = "";
  current_month_transaction_count = "";
  current_month_transaction_value = "";


  Dashboardcount = {};
  constructor(
    private router: Router,
    private Dmtservice: DmtService,
    private auth : AuthService,
    private store: Store<CustomerState>,
    private cacheservice: CacheService,
    
    //private EncrDecr: EncrDecrService,
  ) {
    // const retailerInfo = this.EncrDecr.decryptJson(
    //   sessionStorage.getItem(environment.retailerDatakey)
    // ) as Customer;
    // this.retailerRefId = retailerInfo?.retailer_ref_id;
    // this.retailerMobileNo = retailerInfo?.mobile_number;
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    
    
    setTimeout(() => {
      this.dashboardlist();
    }, 100);
    
  
    
  }
  dashboardlist(){
    console.log("entr in 2")
    const dashboardParam = {
      merchant_id: "0",
      
      
    };
    
    this.auth.getdashboardapi(dashboardParam).subscribe(
      (res: ResponseInterface) => {
        if (res.response_code === "200") {
          console.log("success")
          this.Dashboardcount = res.data;
          this.total_merchants = res.data.total_merchants;
          this .total_submerchants = res.data.total_submerchants;
          this.current_month_added_merchants = res.data.current_month_added_merchants;
          this.current_month_added_submerchant = res.data.current_month_added_submerchant;
          this.total_transaction_count = res.data.total_transaction_count;
          this.total_transaction_values = res.data.total_transaction_values;
          this.current_month_transaction_count = res.data.current_month_transaction_count;
          this.current_month_transaction_value = res.data.current_month_transaction_value;

    
        }
      },
      (err) => {
        if (err?.error?.response_code === "100") {
          this.total_merchants = err.data.total_merchants;
          this .total_submerchants = err.data.total_submerchants;
          this.current_month_added_merchants = err.data.current_month_added_merchants;
          this.current_month_added_submerchant = err.data.current_month_added_submerchant;
          this.total_transaction_count = err.data.total_transaction_count;
          this.total_transaction_values = err.data.total_transaction_values;
          this.current_month_transaction_count = err.data.current_month_transaction_count;
          this.current_month_transaction_value = err.data.current_month_transaction_value;

        }
      }
    );
  }
}
  





import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { ResponseInterface } from "src/app/shared/interface";
import { EncrDecrService } from "src/app/shared/services/encr-decr.service";
import { environment } from "src/environments/environment";
import { Customer } from "../../store/customer/customer.model";
import * as XLSX from "xlsx";
import { UpiService } from "src/app/shared/services/upi.service";

export interface PeriodicElement {
  transaction_id?: string;
  credit?: string;
  debit?: string;
  opening_balance?: string;
  closing_balance?: string;
  comments?: string;
}

@Component({
  selector: "app-transaction-report",
  templateUrl: "./transaction-report.component.html",
  styleUrls: ["./transaction-report.component.scss"],
})
export class TransactionReportComponent implements OnInit, AfterViewInit {
  customerSearchForm!: FormGroup;
  loading = false;
  loadingText = "Search";

  transactionData: PeriodicElement[] = [];
  searchByConfig = {
    displayKey: "name",
    value: "search_option",
    placeholder: "Select option",
  };
  searchByList = [
    {
      search_option: "0",
      name: "All",
    },
    {
      search_option: "1",
      name: "Transaction ID",
    },
    {
      search_option: "2",
      name: "Customer Mobile Number",
    },
  ];
  searchByDefaultValue = {
    search_option: "0",
    name: "All",
  };
  searchValue = "";
  displayedColumns: string[] = [
    "Transaction ID",
    "Transaction Date",
    "Merchant Name",
    "Merchant Mob.No",
    "Customer Name",
    // "Bank",
    // "Acc.No",
    // "RRN Number",
    // "Pay Mode",
    'Merchant company',
    "Amount",
    'UPI Transaction Id',
    'UPI Id',
    "Transaction Status",
    // "Action",
  ];
  // dataSource = new MatTableDataSource([...ELEMENT_DATA]);
  dataSource = new MatTableDataSource<PeriodicElement>(this.transactionData);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  fromDate = new Date();
  toDate = new Date();
  maxDate = new Date();
  retailerRefId = "";
  retailerMobileNo = "";
  noRecordFlag: boolean=true;
  reportResult = [];
  constructor(
    private upiService: UpiService,
    private EncrDecr: EncrDecrService
  ) {
    this.maxDate.setDate(this.maxDate.getDate());
    const retailerInfo = this.EncrDecr.decryptJson(
      sessionStorage.getItem(environment.retailerDatakey)
    ) as Customer;
    this.retailerRefId = retailerInfo?.account_refid;
    this.retailerMobileNo = retailerInfo?.account_mobile_no;
  }
  ngOnInit() {
    this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.searchTransaction();
    }, 100);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  searchTransaction() {
    const fromDate = moment(this.fromDate)
      .startOf("date")
      .format("YYYY-MM-DD HH:mm:ss.SSS");
    const toDate = moment(this.toDate)
      .startOf("date")
      .format("YYYY-MM-DD HH:mm:ss.SSS");

    const reportParam = {
      from_date: fromDate,
      to_date: toDate,
      search_option: this.searchByDefaultValue?.search_option,
      search_value: this.searchValue,
    };
    this.loading = true;
    this.upiService.transactionReport(reportParam).subscribe(
      (res: ResponseInterface) => {
        if (res.response_code === "200") {
          this.loading = false;
          this.reportResult = res?.data;
          this.dataSource.data = this.reportResult?.length
            ? this.reportResult.reverse()
            : [];
        } else {
          this.loading = false;
          this.dataSource.data = [];
        }
      },
      (err) => {
        this.loading = false;
        this.dataSource.data = [];
      }
    );
  }

  filterList(){
    if(this.searchValue == ''){
      this.dataSource.data = this.reportResult?.length
      ? this.reportResult
      : [];
      return;
    }

    let filterData= this.reportResult.length > 0 ? this.reportResult : [];
    if(filterData.length>0){
      filterData = filterData.filter(res =>
        (res.transaction_id.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1) ||
          (res.credit.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1) ||
          (res.transaction_date.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1) ||
          (res.debit.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1) ||
          (res.opening_balance.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1) ||
          (res.closing_balance.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1) ||
          (res.comments.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1)
      );
      this.dataSource.data= filterData.length > 0 ? filterData :[];
    }
  }

  changeClass(){
    var disWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    console.log(disWidth);
    if(disWidth <= 640) {
        this.noRecordFlag=false;
        return "container-fluid touchbar";      
    } else {
        this.noRecordFlag=true;
        return "example-container";
    }
  }
  exportToExcel() {
    const heyReport = this.dataSource.filteredData.map((data: any) => {
      return {
        "Transaction ID": data.transaction_id,
        "Transaction Date": data.transaction_date,
        Credit: data.credit,
        Debit: data.debit,
        "Opening Balance": data.opening_balance,
        "Closing Balance": data.closing_balance,
        Comments: data.comments,
      };
    });
    if (heyReport.length) {
      const fileName = "payout_transaction.xlsx";
      const worksheet = XLSX.utils.json_to_sheet(heyReport, {});
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, fileName);
    }
  }
}

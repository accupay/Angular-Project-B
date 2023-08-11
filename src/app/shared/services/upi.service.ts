import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { baseApiUrl } from "../../providers/api/api";
import { ResponseInterface } from "../interface/auth.interface";

@Injectable({
  providedIn: "root",
})
export class UpiService extends baseApiUrl {
  //Only for demo purpose
  authenticated = true;

  constructor(http: HttpClient) {
    super(http);
  }

  private URL: string = this.getDmtBaseUrl();
 

  verifyVpa(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/upi/Verify_VPA",
      params
    );
  }
  moneyTranferVpa(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/upi/Merchant_Transfer_VPA",
      params
    );
  }

  transactionReport(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/reports/TransactionReport",
      params
    );
  }
}

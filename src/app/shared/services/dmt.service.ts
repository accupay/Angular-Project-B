import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { baseApiUrl } from "../../providers/api/api";
import { ResponseInterface } from "../interface/auth.interface";

@Injectable({
  providedIn: "root",
})
export class DmtService extends baseApiUrl {
  //Only for demo purpose
  authenticated = true;

  constructor(http: HttpClient) {
    super(http);
  }

  private URL: string = this.getDmtBaseUrl();
 

  getCustomerApi(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/dmt/GetCustomerInfo",
      params
    );
  }

  getBeneficiaryApi(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/dmt/GetAllPayee",
      params
    );
  }

  addCustomer(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/dmt/RegisterCustomer",
      params
    );
  }

  validateCustomerRegistrationOtp(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/dmt/ValidateRegisterCustomerOTP",
      params
    );
  }

  resendOtpCRegistration(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/dmt/ResendOTP",
      params
    );
  }

  addPayee(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/dmt/AddPayee",
      params
    );
  }

  payeeValidate(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/dmt/BeneValidate",
      params
    );
  }

  moneyTransferTransaction(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/dmt/Transaction",
      params
    );
  }

  payoutTransaction(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/PayOut/FundTransfer",
      params
    );
  }

  transactionReport(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/reports/TransactionLedgerReport",
      params
    );
  }

  refundPaymenttransactionReport(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/reports/GetRefundPaymentTransactionReport",
      params
    );
  }

  retailerPaymentReport(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/reports/GetRetailerPaymentTransactionReport",
      params
    );
  }

  payoutTransactionReport(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/reports/GetRetailerPaymentTransactionReportPayOut",
      params
    );
  }

  payoutRefundReport(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/reports/GetRefundPaymentTransactionReportPayout",
      params
    );
  }

  refundOtp(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/dmt/Refund",
      params
    );
  }

  deleteBeneOtp(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/dmt/SendOTPForPayeeDeletion",
      params
    );
  }

  deleteBene(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/dmt/DeletePayee",
      params
    );
  }

  getTopupInfo(): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/common/GetTopupInfo",
      ""
    );
  }

  getProfileSupport(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/common/GetSupportInfo?AgentRefID=" + params.AgentRefID,
      ""
    );
  }

  addPgLink(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/PG/CreateOrder",
      params
    );
  }

  retailerTopUpAndPgReport(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/reports/GetRetailerTopupReport",
      params
    );
  }
 
}

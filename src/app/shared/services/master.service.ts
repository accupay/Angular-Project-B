import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { baseApiUrl } from "../../providers/api/api";
import { ResponseInterface } from "../interface/auth.interface";

@Injectable({
  providedIn: "root",
})
export class MasterService extends baseApiUrl {
  //Only for demo purpose
  authenticated = true;

  constructor(http: HttpClient) {
    super(http);
  }

  private URL: string = this.getDmtBaseUrl();
 

  merchantRegistration(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/master/Merchant_Registration",
      params
    );
  }

  merchantCatagoryRegistration(params: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/master/Merchant_Category_Details",
      params
    );
  }

  merchantDetails(): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(
      this.URL + "/api/master/Merchant_Details","" );
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from "@angular/forms";
import {
  ResolveEnd,
  ResolveStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from "@angular/router";
import { CacheService } from "src/app/shared/services/cache-service";
import { UpiService } from 'src/app/shared/services/upi.service';
import { ResponseInterface } from 'src/app/shared/interface';
import { environment } from "src/environments/environment";
import { Customer } from '../../store/customer/customer.model';
import { EncrDecrService } from 'src/app/shared/services/encr-decr.service';

@Component({
  selector: 'app-verify-VPA',
  templateUrl: './verify_VPA_component.html',
  styleUrls: ['./verify_VPA_component.scss']
})
export class VerifyVPAComponent implements OnInit {
  loading: boolean;

  loadingText = "Proceed";
  verifyTransaction!: FormGroup;
  upiIdError: boolean = false;
  successFlag: boolean = false;
  errorFlag: boolean = false;
  userRefId = '';
  userMobileNo = '';
  constructor(
    private router: Router,
    private upiService: UpiService,
    private EncrDecr: EncrDecrService,
  ) {
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
        this.loadingText = "Loading verify VPA Module...";

        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });
    this.initLoginForm();
  }

  public initLoginForm(): void {
    this.verifyTransaction = new FormGroup({

      amount: new FormControl("", [Validators.required, Validators.maxLength(5)]),
      upiId: new FormControl("", [Validators.required]),
    });
  }

  verifyVPA(data) {
    debugger;
    if (data.valid) {
      const verifyVpaParam = {
        merchant_id: this.userRefId,
        account_type_ref_id: environment.account_type_ref_id,
        upi_id: data.value.upiId,
        user_ref_id: this.userRefId,
      };

      this.upiService.verifyVpa(verifyVpaParam).subscribe(
        (res: ResponseInterface) => {
          if (res.response_code === "200") {
            this.successFlag = true;
            this.errorFlag = false;
            this.idDisable();
          }else{
            this.errorFlag = true;
            this.successFlag = false;
            this.idDisable();
          }
        },
        (err) => {
          this.errorFlag = true;
          this.successFlag = false;
          this.idDisable();
         }
      );

    } 

  }

  isNumeric(n: any): n is number | string {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  CheckUpiId(data) {
    if (this.isNumeric(data.value.upiId)) {
      this.upiIdError = false;
      this.verifyTransaction.controls[
        "amount"
      ].setValidators([
        Validators.required,
      ]);
      this.verifyTransaction.controls[
        "upiId"
      ].setValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^[6-9]\d{9}$/),
      ]);
    } else {
      var result = /^[\w.-]+@[\w.-]+$/.test(data.value.upiId);
      if (result) {

        this.verifyTransaction.controls[
          "upiId"
        ].setValidators([
          Validators.required,
          Validators.pattern(/^[\w.-]+@[\w.-]+$/),
        ]);
        this.upiIdError = false;
        this.setValid('upiId');

      } else {
        this.verifyTransaction.controls[
          "upiId"
        ].setValidators([
          Validators.required,
          Validators.pattern(/^[\w.-]+@[\w.-]+$/),
        ]);
        this.upiIdError = true;
      }

    }

  }

  setValid(controlName: string) {

    this.verifyTransaction.controls[controlName].markAsPristine();
    this.verifyTransaction.controls[controlName].markAsUntouched();
  }
  setError(controlName: string) {

    this.verifyTransaction.controls[controlName].markAsDirty();
    this.verifyTransaction.controls[controlName].markAsTouched();
  }

  public myError = (controlName: string, errorName: string) => {
    return this.verifyTransaction.controls[controlName].hasError(errorName);
  }

  retry() {
    this.successFlag = false;
    this.errorFlag = false;
    this.isEnable();
  }

  proceed() {
    this.successFlag = false;
    this.errorFlag = false;
    this.isEnable();


    const moneyTransferVpaParam = {
      merchant_id: "1",
      account_type_ref_id: environment.account_type_ref_id,
      upi_id: this.verifyTransaction.value.upiId,
      user_ref_id: "1",
      customer_name: '',
      amount: "string",
      remarks: "string",
      type: "string",
      receipt: "string",
    };
    this.upiService.moneyTranferVpa(moneyTransferVpaParam).subscribe(
      (res: ResponseInterface) => {
        if (res.response_code === "200") {
          if (res.response_code === "200") {
            // sessionStorage.setItem("atp_c_otp_state", res?.data?.state);
          } else {
            // sessionStorage.setItem("atp_c_otp_state", "");
          }
          // this.timeLeft = 50;
          // this.startResendOtpTimer();
        }
      },
      (err) => {}
    );
  }
  idDisable() {
    // for(let i=0; i<this.verifyTransaction.controls.; i++ ){
    this.verifyTransaction.controls['amount'].disable();
    this.verifyTransaction.controls['upiId'].disable();
    // }
  }
  isEnable() {
    this.verifyTransaction.controls['amount'].enable();
    this.verifyTransaction.controls['upiId'].enable();
  }
}

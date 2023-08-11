import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { DmtService } from "src/app/shared/services/dmt.service";
import { environment } from "src/environments/environment";
import { selectCustomerLookUpData } from "../../store/customer/customer.selector";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Customer } from "../../store/customer/customer.model";
import { ResponseInterface } from "src/app/shared/interface";
import { EncrDecrService } from "src/app/shared/services/encr-decr.service";

@Component({
  selector: "app-refund",
  templateUrl: "./refund.component.html",
  styleUrls: ["./refund.component.scss"],
})
export class RefundComponent implements OnInit {
  retailerRefId = "";
  
  transactionResponseData: any;
  refundType = "money-transfer";
  loading: boolean = false;
  loadingText = "Verify";
  otpValue = "";
  hideOtpErrorText: boolean = false;
  timeLeft: number = 50;
  interval;
  currentCustomerMobileNumber = "";

  constructor(
    public activeModal: NgbActiveModal,
    private dmtService: DmtService,
    private EncrDecr: EncrDecrService
  ) {
    const retailerInfo = this.EncrDecr.decryptJson(
      sessionStorage.getItem(environment.retailerDatakey)
    ) as Customer;
    this.retailerRefId = retailerInfo?.account_refid;
  }
  ngOnInit() {
    this.startResendOtpTimer();
  }

  close() {
    this.activeModal.close();
  }
  checkValidOtp() {
    if (this.otpValue) {
      this.hideOtpErrorText = false;
    } else {
      this.hideOtpErrorText = true;
    }
  }

  confirm() {
    if (this.otpValue === "" || this.otpValue === undefined) {
      this.hideOtpErrorText = true;
    } else {
      this.loading = true;
      this.loadingText = "verifying OTP...";
      const refundOtpVerfityData = {
        otp: this.otpValue,
        mobile_no: this.transactionResponseData?.customermobileno,
        agent_ref_id: this.retailerRefId,
        transaction_id: this.transactionResponseData?.transactionid,
        payment_type: this.refundType === "money-transfer" ? "DMT" : "PAYOUT",
      };

      this.dmtService.refundOtp(refundOtpVerfityData).subscribe(
        (res: ResponseInterface) => {
          if (res.response_code === "200") {
            this.loading = true;
            this.activeModal.close(1);
            Swal.fire({
              title: "Success!",
              text: "Transaction Refunded Succesfully",
              icon: "success",
              confirmButtonColor: "#1172b3",
              confirmButtonText: "Ok",
            });
          } else if (res.response_code === "400") {
            this.hideOtpErrorText = true;
          } else {
            Swal.fire({
              title: "Error!",
              text: "An error occured. Please contact administrator for further support",
              icon: "error",
              confirmButtonColor: "#1172b3",
              confirmButtonText: "Ok",
            });
            this.activeModal.close(0);
          }
        },
        (err) => {
          this.loadingText = "verify";
          this.loading = false;
        }
      );
    }
  }

  resendOTP() {
    const otpCheckParam = {
      account_type: environment.account_type_ref_id,
      mobile_no:
        this.refundType === "money-transfer"
          ? this.transactionResponseData?.customermobileno
          : this.transactionResponseData?.amobileno,
      agent_ref_id: this.retailerRefId,
      is_internal: true,
    };
    this.dmtService.resendOtpCRegistration(otpCheckParam).subscribe(
      (res: ResponseInterface) => {
        if (res.response_code === "200") {
          if (res.response_code === "200") {
            sessionStorage.setItem("atp_c_otp_state", res?.data?.state);
          } else {
            sessionStorage.setItem("atp_c_otp_state", "");
          }
          this.timeLeft = 50;
          this.startResendOtpTimer();
        }
      },
      (err) => {}
    );
  }

  startResendOtpTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }
}

import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ResponseInterface } from "src/app/shared/interface";
import { DmtService } from "src/app/shared/services/dmt.service";
import { EncrDecrService } from "src/app/shared/services/encr-decr.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { Customer } from "../../store/customer/customer.model";

@Component({
  selector: "app-delete-bene-otp",
  templateUrl: "./delete-bene-otp.component.html",
  styleUrls: ["./delete-bene-otp.component.scss"],
})
export class DeleteBeneOtpComponent implements OnInit {
  retailerRefId = "";
  beneDetail: any;
  customerDetail: any;
  customerResponseData: any;
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
    this.retailerRefId = retailerInfo?.retailer_ref_id;
  }
  ngOnInit() {
    this.sendOtpforDeleteBene();
    this.currentCustomerMobileNumber = this.customerDetail?.mobile_number;
    this.startResendOtpTimer();
  }

  sendOtpforDeleteBene() {
    const otpParam = {
      mobile_no: this.customerDetail?.mobile_number,
      agent_ref_id: this.retailerRefId,
      account_type: environment.account_type_ref_id,
      is_internal: false,
    };

    this.dmtService
      .deleteBeneOtp(otpParam)
      .subscribe((res: ResponseInterface) => {
        if (res.response_code === "200") {
          sessionStorage.setItem("atp_c_otp_state", res?.data?.state);
        }
      });
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
      const deletePayee = {
        mobile_no: this.customerDetail?.mobile_number,
        payee_ref_id: this.beneDetail?.payee_ref_id,
        otp: this.otpValue,
        otp_state: sessionStorage.getItem("atp_c_otp_state"),
        beneficiary_id: this.beneDetail?.beneficiaryId,
      };
      if (sessionStorage.getItem("atp_c_otp_state") === "") {
        this.otpStateEmpty();
      }
      this.dmtService.deleteBene(deletePayee).subscribe(
        (res: ResponseInterface) => {
          if (res.response_code === "200") {
            this.loading = true;
            setTimeout(() => {
              this.activeModal.close(1);
            }, 2000);
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

  otpStateEmpty() {
    Swal.fire({
      title: "Error!",
      text: "Something went wrong, Please try Again Later!",
      icon: "error",
      confirmButtonColor: "#1172b3",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
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

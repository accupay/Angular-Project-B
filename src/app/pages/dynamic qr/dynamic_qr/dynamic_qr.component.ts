import { Component, OnInit, VERSION } from '@angular/core';
import { SafeUrl, SafeValue } from '@angular/platform-browser';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from 'ngx-qrcode2';


@Component({
  selector: 'app-dynamic-qr',
  templateUrl: './dynamic_qr.component.html',
  styleUrls: ['./dynamic_qr.component.scss']
})
export class DynamicQRComponent implements OnInit {
  // public myAngularxQrCode: string = "";
  // public qrCodeDownloadLink: SafeUrl = '';
  name = 'Angular'+ VERSION.major;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'upi://pay?pa=intellemo@icici&pn=Intellemo&tn=cftrhwetaw4gta&am';

  

  constructor() {  
    // this.myAngularxQrCode = 'https://accupaydtech.co/';
  }

  ngOnInit(): void {
   
  
  }
  
  downloadQRCode() {
    const fileNameToDownload = 'image_qrcode';
    const base64Img = document.getElementsByClassName('coolQRCode')[0].children[0]['src'];
    fetch(base64Img)
       .then(res => res.blob())
       .then((blob) => {
          // IE
          if (window.navigator && (window.navigator as any).msSaveOrOpenBlob){
             (window.navigator as any).msSaveOrOpenBlob(blob,fileNameToDownload);
          } else { // Chrome
             const url = window.URL.createObjectURL(blob);
             const link = document.createElement('a');
             link.href = url;
             link.download = fileNameToDownload;
             link.click();
          }
       })
 }

}

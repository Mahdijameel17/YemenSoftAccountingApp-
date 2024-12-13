import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator/ngx';

import { IonHeader, IonButton, IonContent, ModalController,IonButtons, IonToolbar, IonTitle, IonIcon, IonFooter } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import {  arrowBackOutline} from 'ionicons/icons';
@Component({
  selector: 'app-invoice-countrie',
  templateUrl: './invoice-countrie.component.html',
  styleUrls: ['./invoice-countrie.component.scss'],
  standalone: true,
  imports: [IonFooter, IonIcon, IonTitle, IonToolbar, IonButtons, IonContent, IonButton, IonHeader,NgFor ],
})
export class InvoiceCountrieComponent  implements OnInit {
  @Input() order;
  content: string='';
  constructor(private modalContrller:ModalController,
    private pdfGenerator: PDFGenerator
  ) { 

    addIcons({
      arrowBackOutline  });
  }

  ngOnInit() {}
  closeModal() {
    this.modalContrller.dismiss();
  }
  downloadInvoice() {
    const element = document.getElementById('PrintInvoice');
    if (element) {
      this.content = element.innerHTML;
    }
        let options = {
      documentSize: 'A4',
      type: 'share',
      // landscape: 'portrait',
      fileName: 'LiteSoft-Invoice.pdf'
    };
    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        console.log('OK', base64);
      }).catch((error) => {
        console.log('error', error);
      });

  }
  

}

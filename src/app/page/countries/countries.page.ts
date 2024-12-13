import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  AlertController,
  IonButtons,
  IonMenuButton,
  IonThumbnail,
  IonContent,
  IonToolbar,
  IonRow,
  IonCol,
  IonLabel,
  IonText,
  IonList,
  IonListHeader,
  IonButton,
  ModalController,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
  IonHeader,
  IonActionSheet,
  IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  document,
  createOutline,
  trashOutline,
  printOutline,
  informationCircleOutline,
} from 'ionicons/icons';
import { CountriesService } from 'src/app/Services/countries.service';
import { InvoiceCountrieComponent } from 'src/app/components/invoice-countrie/invoice-countrie.component';
import { RouterModule } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonActionSheet,
    IonHeader,
    IonIcon,
    IonFabButton,
    IonFab,
    IonItem,
    IonButton,
    IonListHeader,
    IonList,
    IonText,
    IonLabel,
    IonCol,
    IonRow,
    IonToolbar,
    IonContent,
    IonToolbar,
    IonFab,
    NgFor,
    IonFabButton,
    IonRow,
    IonCol,
    IonIcon,
    IonListHeader,
    IonList,
    IonButton,
    IonThumbnail,
    IonItem,
    IonText,
    IonLabel,
    IonButtons,
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    IonMenuButton,
    FormsModule,
    RouterModule,
  ],
})
export class countriesPage implements OnInit {
  order = {
    address: {
      title: 'المنزل',
      name: 'ميدا',
      flatNumber: 115,
      street: 'طريق برايتون',
      locality: 'برايتون',
    },
    grandTotal: 87,
    products: [
      {
        images: ['free-apple-icon-3155-thumb.png'],
        name: 'تفاح',
        offer: 10,
        salePrice: 2.7,
        regularPrice: 3,
        units: 10,
      },
      {
        images: ['free-apple-icon-3155-thumb.png'],
        name: 'برياني',
        offer: 20,
        salePrice: 12,
        regularPrice: 15,
        units: 5,
      },
    ],
    status: 'تم التوصيل',
    delivery_status: 'غير معين',
    createdAt: '3 نوفمبر 2020 الساعة 3:49 مساءً',
  };

  CountrieList: any = [];
  //   Conters:any= Object.entries(countries).map(([country, cities]) => {
  //     return {

  //       "countries": country,
  //       "cities": cities
  //       };
  //     }).slice(0,5);
  ruselt: any = {
    data: 0,
    message: '',
  };

  constructor(
    private Countrie: CountriesService,
    private alertCrtl: AlertController,
    private modalCtrl: ModalController
  ) {
    addIcons({
      add,
      document,
      printOutline,
      trashOutline,
      informationCircleOutline,
      createOutline,
    });
  }
  ngOnInit() {
    this.getCountrie();
  }

  ///////////////////////////////////////
  // استرجاع البيانات من خلال ال api
async   getCountrie() {
    this.CountrieList = [];
   this.Countrie.getCountries().subscribe((res) => {

    res.map((item) => {

      this.CountrieList.push(item);
    });
  });
  }

  // البيانات الأصلية

  // استدعاء الدالة وطباعة النتيجة

  //////////////////////////////////
  // اضافة بيانات
 async   addCountrie() {
   await this.alertCrtl
      .create({
        header: 'اضافة بيانات',
        message: 'هل تريد اضافة بيانات؟',
        inputs: [
          {
            name: 'Countrie',
            type: 'text',
            placeholder: 'ادخل البيانات',
          },
        ],
        buttons: [
          {
            role: 'cancel',
            text: 'الغاء',
          },
          {
            text: 'اظافة',
            handler: (data) => {
              return this.Countrie.createCountries(data.Countrie).subscribe(
                (res) => {
                  if (res == 200) {
                    this.alertShowSuccess(
                      'تم الاضافة بنجاح',
                      'تم الاضافة بنجاح'
                    ).then((alert) => {
                      alert.present();
                      alert.onDidDismiss().then(() => {
                        this.getCountrie();
                      });
                    });
                  }
                }
              );
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
        alert.onDidDismiss().then(() => {
          this.getCountrie();
        });
      });

    //  this.alertShowSuccess('تم الاضافة بنجاح', 'تم الاضافة بنجاح');
    //  this.alertShowError('خطاء', 'خطاء في الاتصال');
  }
  // تعديل بيانات
 async editCountrie(id: number, Countrie: string) {
   await this.alertCrtl
      .create({
        header: 'تعديل بيانات',
        message: 'هل تريد تعديل بيانات؟',
        inputs: [
          {
            name: 'Countrie',
            type: 'text',
            placeholder: 'ادخل البيانات',
            value: Countrie,
          },
        ],
        buttons: [
          {
            role: 'cancel',
            text: 'الغاء',
          },
          {
            text: 'تعديل',
            handler: (data) => {
              this.Countrie.updateCountries({
                id: id,
                summary: data.Countrie,
              }).subscribe((res) => {
                if (res == 200) {
                  this.alertShowSuccess(
                    'تم التعديل بنجاح',
                    'تم التعديل بنجاح'
                  ).then((alert) => {
                    alert.present();
                    alert.onDidDismiss().then(() => {
                      this.getCountrie();
                    });
                  });
                }
              });
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
        alert.onDidDismiss().then(() => {
          this.getCountrie();
        });
      });
  }

  // حذف بيانات
async  deleteCountrie(id: number, Countrie: string) {
  await  this.alertCrtl
      .create({
        header: 'حذف بيانات',
        message: 'هل تريد حذف بيانات؟' + Countrie,

        buttons: [
          {
            role: 'cancel',
            text: 'الغاء',
          },
          {
            text: 'حذف',
            handler: () => {
              this.Countrie.deleteCountries(id).subscribe((res) => {
                if (res == 200) {
                  this.alertShowError('  نجاح', 'تم الحذف بنجاح').then(
                    (alert) => {
                      alert.present();
                      alert.onDidDismiss().then(() => {
                        this.getCountrie();
                      });
                    }
                  );
                }
              });
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
        alert.onDidDismiss().then(() => {
  
        this.getCountrie();
        });
      });
    //onDidDismiss الدالة تعمل بعد انتهاء مربع الحور
    // await alert.onDidDismiss().then(() => {
    //   console.log("-------------------------3-------------------------");
    //   console.log(Result);
    //   console.log("--------------------------------------------------");

    //   if(Result==200){
    //    this.alertShowError('  نجاح', 'تم الحذف بنجاح');
    //    this.getCountrie();}

    //  });
  }

  ///////////////////////////////////
  //رسائل حفظ البيانات
 async alertShowSuccess(title: string, message: string) {
    const alert =await  this.alertCrtl.create({
      header: title,
      message: message,
      cssClass: 'success-alert',
      buttons: ['تم'],
    });
    return alert;
  }
  async alertShowError(title: string, message: string) {
    const alert = await this.alertCrtl.create({
      header: title,
      message: message,
      buttons: ['تم'],
      cssClass: 'error-alert',
    });
    return alert;
  }

  async printCountrie(order) {
    const InvoiceModal = await this.createModal(InvoiceCountrieComponent, {
      order,
    });
    await InvoiceModal.present();
  }

  async createModal(
    component,
    componentProps,
    cssClass?
  ): Promise<HTMLIonModalElement> {
    const modal = await this.modalCtrl.create({
      component,
      componentProps,
      cssClass,
      backdropDismiss: true,
    });
    return modal;
  }
}

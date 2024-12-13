import { Injectable } from '@angular/core';
import { AlertController, LoadingController, PickerController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  loading: HTMLIonLoadingElement;

  constructor(private alertCtrl: AlertController, private loadingController: LoadingController,private picker: PickerController) {}

  async alertShowSuccess(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      cssClass: 'success-alert',
      buttons: ['تم'],
    });
    await alert.present();
  }

  async alertShowError(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      cssClass: 'error-alert',
      buttons: ['تم'],
    });
    await alert.present();
  }
  async AlertConfirm(message: string): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header: 'تنبيه',
      message: message,
      buttons: [
        {
          text: 'الغاء',
          role: 'cancel',
        },
        {
          text: 'تأكيد',
          role: 'confirm',
          handler: () => {
            return true;
          },
        },
      ],
    });
  
    await alert.present();
  
    const result = await alert.onDidDismiss();
    return result.role === 'confirm';
  }

  
  
  async showLoading(message: string = 'جاري التحميل...') {
    this.loading = await this.loadingController.create({
      message: message,
    });
    await this.loading.present();
  }


  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
  // async enableMenu(bool: boolean) {
  //   await this.menu.enable(bool);
  // }

  //   async closeMenu() {
  //     await this.menu.close();
  //   }

    async createPickerDate(): Promise<any> {
      return new Promise(async (resolve) => {
        const picker = await this.picker.create({
          columns: [
            {
              name: 'day',
              options: this.generateNumberOptions(1, 31, 'اليوم'),
            },
            {
              name: 'month',
              options: this.generateNumberOptions(1, 12, 'الشهر'),
            },
            {
              name: 'year',
              options: this.generateNumberOptions(1, 10, 'السنة'),
            },
          ],
          buttons: [
            {
              text: 'اغلاق',
              role: 'cancel',
              handler: () => resolve(null),
            },
            {
              text: 'حفظ',
              handler: (data) => resolve(data),
            },
          ]
        });
    
        await picker.present();
      });
    }
    
    generateNumberOptions(start, end, text) {
      let options = [{ text: text, value: '0' }]; // إضافة القيمة صفر
      for (let i = start; i <= end; i++) {
        options.push({ text: i.toString(), value: i.toString() });
      }
      return options;
    }

    
    
}

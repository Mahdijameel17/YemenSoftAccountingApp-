import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';
@Injectable({
  providedIn: 'root'
})
export class UpdateDataAlertService {

  constructor(private alert:AlertController ) { }

  async updateData(message: string, value, type:string): Promise<any> {
    return new Promise(async (resolve) => {
      const inputs = this.getInputsByType(type, value);
      const alert = await this.alert.create({
        message: message,
        
        inputs: inputs,
        buttons: [
          {
            text: 'إلغاء',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'حفظ',
            handler: (data) => {
             
              resolve(data.value);      
            }
          }
        ]
      });
      await alert.present();
    });
  }
  
  async settingsSave(): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alert
      .create({
        header: 'تنبيه',
        cssClass: 'error-alert',
        message: 'هل تريد تغيير الاعدادات؟',
        buttons: [
          {
            text: 'لا',
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: 'نعم',
            role: 'confirm',
            handler: () => {
              resolve(true);
            },
          },
        ],
      });
      await alert.present();
    })
 
  }
  getInputsByType(type, value): any {
    switch (type) {
      case 'text':
        return [
          {
            name: 'value',
            type: 'text',
            cssClass: 'warning',
            placeholder: 'ادخل البيانات',
            value: value,
            attributes: {
              autofocus: true,
            }
          },
        ];
      case 'number':
        return [
          {
            name: 'value',
            type: 'number',
            cssClass: 'warning',
            placeholder: 'ادخل البيانات',
            value: value,
            attributes: {
              autofocus: true,
            }
          },
        ];
        case 'select':
          if (value.DataSelect && Array.isArray(value.DataSelect)) {
            return value.DataSelect.map((item, index) => ({
              name: 'option' + index,
              type: 'radio',
              label: item.Name, 
              value: {value:{ Id: item.Id, Name: item.Name }},
              checked: item.Id === value.Id 
            }));
          }
          break;
      default:
        return []; // في حالة عدم تطابق أي نوع
    }
  }
 


}

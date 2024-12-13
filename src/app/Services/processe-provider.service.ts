import { Injectable } from '@angular/core';
import { ApiProviderService } from './api-provider.service';
import { DialogService } from './dialogServices/dialog.service';
import { ResponseCode } from '../enum/ELookup';

@Injectable({
  providedIn: 'root',
})
export class ProcesseProviderService {
  dataResponse: any;
  constructor(private api: ApiProviderService, private dialog: DialogService) {}
  async getListAsString(url: string): Promise<any> {
    try {
      this.dialog.showLoading();
      await this.api.getData(url).then((data) => {
        this.dataResponse = data;
      });
      if (!this.ResponseCodeServer(this.dataResponse.Code)) {
        throw new Error('خطأ في السيرفر');
      }
    } catch (error) {
      this.dialog.alertShowError('خطأ', 'تأكد من اتصالك بالإنترنت');
    } finally {
      this.dialog.hideLoading();
    }
    return this.dataResponse.Data;
  }
  async add(url: string, data: any, message: string): Promise<any> {
    try {
      this.dialog.showLoading('جاري الحفظ...');
      await this.api.postData(url, data).then((data) => {
        this.dataResponse = data;
      });
      if (!this.ResponseCodeServer(this.dataResponse.Code)) {
        throw new Error('خطأ في السيرفر');
      } else {
        this.dialog.alertShowSuccess('نجاح', message);
      }
    } catch (error) {
      console.log(error);
      this.dialog.alertShowError('خطأ', 'تأكد من اتصالك بالإنترنت');
    } finally {
      this.dialog.hideLoading();
    }
    return this.dataResponse;
  }
  async edit(url: string, data: any, message: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        this.dialog.showLoading('جاري حفظ التعديل...');
        await this.api.postData(url, data).then((data) => {
          this.dataResponse = data;
        });
        if (!this.ResponseCodeServer(this.dataResponse.Code)) {
          reject(new Error('خطأ في السيرفر'));
        } else {
          this.dialog.alertShowSuccess('نجاح', message);
          resolve(true); // إرجاع البيانات بنجاح
        }
      } catch (error) {
        this.dialog.hideLoading();
        this.dialog.alertShowError('خطأ', 'تأكد من اتصالك بالإنترنت');
        reject(error); // إرجاع الخطأ
      } finally {
        this.dialog.hideLoading();
      }
    });
  }
  async delete(url: string, data: any, message: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        this.dialog.showLoading('جاري حذف...');
        await this.api.postData(url, data).then((data) => {
          this.dataResponse = data;
        });
        if (!this.ResponseCodeServer(this.dataResponse.Code)) {
          reject(new Error('خطأ في السيرفر'));
        } else {
          this.dialog.alertShowError('نجاح', message);
          resolve(true); 
        }
      } catch (error) {
        this.dialog.hideLoading();
        this.dialog.alertShowError('خطأ', 'تأكد من اتصالك بالإنترنت');
        reject(error); // إرجاع الخطأ
      } finally {
        this.dialog.hideLoading();
      }
    });
  }

  async getByRequireList(url: string, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        this.dialog.showLoading();
        await this.api.postData(url, data).then((data) => {
          this.dataResponse = data;
        });
        if (!this.ResponseCodeServer(this.dataResponse.Code)) {
          reject(new Error('خطأ في السيرفر'));
        } else {
          resolve(this.dataResponse.Data);
        }
      } catch (error) {
        reject(error);
      } finally {
        this.dialog.hideLoading();
      }
    });
  }
  async FindById(url: string, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        this.dialog.showLoading();
        await this.api.postData(url, data).then((data) => {
          this.dataResponse = data;
        });
        if (!this.ResponseCodeServer(this.dataResponse.Code)) {
          reject(new Error('خطأ في السيرفر'));
        } else {
          resolve(this.dataResponse.Data);
        }
      } catch (error) {
        reject(error);
      } finally {
        this.dialog.hideLoading();
      }
    });
  }

  ResponseCodeServer(code: number): boolean {
    return code === ResponseCode.Success;
  }
}

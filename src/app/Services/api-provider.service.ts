import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiProviderService {
  baseUrl='https://erpapi.litesoftit.com/';
  constructor(private https: HttpClient) {}

  getData(url) {
    return new Promise((resolve, reject) => {
      this.https.get(this.baseUrl + url).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          console.error(error); // Use console.error for errors
          reject(error);
        }
      );
    });
  }

  getListAsString(url) {
    return new Promise((resolve, reject) => {
      this.https.get(this.baseUrl + url).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          console.error(error); // Use console.error for errors
          reject(error);
        }
      );
    });
  }

  postDataList( url,content) {
    return new Promise((resolve, reject) => {
      this.https.post(this.baseUrl + url, content).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          console.error(error); // Use console.error for errors
          reject(error);
        }
      );
    });
  }
  deleteData(url) {
    return new Promise((resolve, reject) => {
      this.https.delete(this.baseUrl + url).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          console.error(error); // Use console.error for errors
          reject(error);
        }
      );
    });
  }
  postData( url, content) {
    return new Promise((resolve, reject) => {
      this.https.post(this.baseUrl + url, content).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          console.error(error); // Use console.error for errors
          reject(error);
        }
      );
    });
  }
}

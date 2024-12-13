import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  constructor(private navCtrl: NavController, private router: Router) {}

  back() {
    this.navCtrl.back();
  }

  backUrl(url) {
    this.navCtrl.navigateRoot(url);
  }
  redirectTo(uri: string): void {
    this.router.navigateByUrl(uri);
  }
}

import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonNav, IonImg, IonButton, IonButtons, IonFab,IonMenuButton, IonFooter } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  
  imports: [IonFooter, IonFab, IonButtons, IonButton, IonImg, IonHeader, IonToolbar, IonTitle, IonContent,IonNav,IonButton,IonMenuButton],
})
export class HomePage {
  constructor() {}
}

import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet,IonMenu, IonContent, IonLabel, IonButton, IonIcon, IonList, IonItem, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {  pieChartOutline,exitOutline ,archiveOutline, bagHandleOutline } from 'ionicons/icons';
import {  RouterModule } from '@angular/router';
import { AuthenticationService } from './Services/account/authentication.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl:'app.component.scss',
  standalone: true,

  imports: [IonFooter,NgIf, IonItem, IonList, IonIcon, IonButton, IonLabel, IonContent, IonApp, IonRouterOutlet,IonMenu,RouterModule],
})
export class AppComponent implements OnInit {

  constructor(public auth: AuthenticationService) {

    addIcons({
      pieChartOutline,
      bagHandleOutline,
      archiveOutline,
      exitOutline
    });

    
  }

  ngOnInit() {

    
  }
  logout(){
    this.auth.logout();


  }
  
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {  archive,desktopOutline,documentsOutline } from 'ionicons/icons';

import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonMenuButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons, IonIcon, IonCol, IonRow, IonGrid, IonLabel, IonText } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['/src/style/main-page.scss'],
  standalone: true,
  imports: [IonText, IonLabel, IonGrid, IonRow, IonCol, IonIcon, 
    IonButtons,
    IonMenuButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule
    
  ],
})
export class StorePage implements OnInit {
  constructor() {
    addIcons({
     archive,
     desktopOutline,
     documentsOutline
    });
  }

  ngOnInit() {}
}

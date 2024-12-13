import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonGrid, IonRow, IonCol, IonLabel, IonText } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
  standalone: true,
  imports: [IonText, IonLabel, IonCol, IonRow, IonGrid, IonIcon, IonButtons, IonContent,IonMenuButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterModule]
})
export class SalesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

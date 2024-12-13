import { Component, OnInit } from '@angular/core';

import { IonBackButton, IonHeader, IonContent, IonToolbar, IonButtons,IonThumbnail, IonList, IonItem, IonLabel, IonChip, IonText, IonSegment, IonRow, IonSegmentButton, IonCol, IonFooter, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contries-detail',
  templateUrl: './contries-detail.page.html',
  styleUrls: ['./contries-detail.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonFooter, IonCol, IonSegmentButton, IonRow, IonSegment, IonText, IonChip, IonLabel, IonItem, IonList, IonButtons, IonToolbar, IonContent, IonHeader, IonBackButton, IonThumbnail ]
})
export class ContriesDetailPage implements OnInit {
  id:any ;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    console.log(this.id);

  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  checkmark,
  close,
  refreshOutline,
  settings,
  trash,
} from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonSelect,
  IonSelectOption,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonLabel,
  IonItem,
  IonList,
  IonIcon,
  IonAvatar,
  IonInput,
  IonButtons,
  IonButton,
  IonChip,
  IonCardSubtitle,
  IonCol,
  IonRow,
  IonGrid,
  IonToggle,
  IonText,
  IonFabButton,
  IonFab,
  IonFabList,
} from '@ionic/angular/standalone';
import { ItemGroupModel } from 'src/app/Models/StoreModel';
import { DataService } from 'src/app/Services/dialogServices/data.service';
import { ProcesseProviderService } from 'src/app/Services/processe-provider.service';
import { NavService } from 'src/app/Services/dialogServices/nav.service';
import { DialogService } from 'src/app/Services/dialogServices/dialog.service';
@Component({
  selector: 'app-operations-page',
  templateUrl: './operations-page.page.html',
  styleUrls: ['../../../../../style/operation-page.scss'],
  standalone: true,
  imports: [
    IonFabList,
    IonFab,
    IonFabButton,
    IonText,
    IonToggle,
    IonGrid,
    NgIf,
    IonRow,
    IonCol,
    IonCardSubtitle,
    IonChip,
    IonButton,
    IonButtons,
    IonInput,
    IonAvatar,
    NgFor,
    IonSelectOption,
    IonSelect,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonBackButton,
    IonContent,
    IonThumbnail,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OperationsPagePage implements OnInit {
  itemGroup: ItemGroupModel;

  itemGroupFormGroup: FormGroup = new FormGroup({
    
    Name: new FormControl('', Validators.required),
    Sort: new FormControl(null),
    ParentId: new FormControl(null),
    StoreCurrencyId: new FormControl(1, Validators.required),
    CostLessSale: new FormControl(false),
    AllowNeg: new FormControl(false),
    AllowNegForAllItemGroup: new FormControl(false),
    IsExpire: new FormControl(false),
    IsNotifyExp: new FormControl(false),
    ExpDay: new FormControl(0),
    ExpMonth: new FormControl(0),
    ExpYear: new FormControl(0),
    AvgCostAtCurrentVal: new FormControl(false),
    IsScale: new FormControl(false),
  });

  ElookupItemGroup: { Name: string; Id: string }[] = [];
  ElookupCurrency: { Name: string; Id: string }[] = [];

  ElookupTarmeez: { Name: string; ItemNo: number }[] = [];

  data: any;

  constructor(
    private dataService: DataService,
    private processe: ProcesseProviderService,
    private dialog: DialogService,
    public navService: NavService
  ) {
    addIcons({
      checkmark,
      close,
      settings,
      trash,
      refreshOutline,
    });
  }

  ngOnInit() {
    this.getElookup();
  }

  getElookup() {
    const data = this.dataService.getData();

    if (data) {
      this.ElookupItemGroup = data['ItemGroup'];
      this.ElookupCurrency = data['Currency'];
      this.ElookupTarmeez = data['Tarmeez'];
    }
  }
  async save() {
    if (this.itemGroupFormGroup.valid) {
      this.itemGroup = this.itemGroupFormGroup.value;
      await this.processe.add(
        'api/ItemGroupApi/Add',
        this.itemGroup,
        'تم الحفظ بنجاح'
      );
    }
  }


  IsNotifyExp() {
    this.dialog.createPickerDate().then((res) => {
      if (res) {
        this.itemGroupFormGroup.patchValue({
          IsNotifyExp: true,
          ExpDay: res.day.value,
          ExpMonth: res.month.value,
          ExpYear: res.year.value,
        });
      }
    });
  }

  generateNumberOptions(start, end, text) {
    let options = [{ text: text, value: '0' }]; // إضافة القيمة صفر
    for (let i = start; i <= end; i++) {
      options.push({ text: i.toString(), value: i.toString() });
    }
    return options;
  }
  toggleAllowNegForAllItemGroup() {
    if (!this.itemGroupFormGroup.value.AllowNegForAllItemGroup) {
      this.dialog
        .AlertConfirm(
          'هل تريد تطبيق خاصة السماح بالكميات السالبة على جميع اصناف هذه المجموعة؟'
        )
        .then((res) => {
          if (res) {
            this.itemGroupFormGroup.patchValue({
              AllowNegForAllItemGroup: true,
            });
          }
        });
    } else {
      this.itemGroupFormGroup.patchValue({
        AllowNegForAllItemGroup: false,
      });
    }
  }

  
  clear() {
    this.dialog.AlertConfirm('هل تريد افرغ  جميع البيانات؟').then((res) => {
      if (res) {
        this.itemGroupFormGroup.reset();
        this.itemGroupFormGroup.patchValue({
          StoreCurrencyId: 1,
        });
      }
    });
  }
  refresh() {
    this.dialog.AlertConfirm('هل تريد تحديث البيانات؟').then((res) => {
      if (res) {
        this.dataService.getElookupItemGroup().finally(() => {
          this.getElookup();
        });
      }
    });
  }
}

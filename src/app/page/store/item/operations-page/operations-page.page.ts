import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonBackButton,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonFab,
  IonFabButton,
  IonFabList,
  IonInput,
  IonList,
  IonItem,
  IonGrid,
  IonText,
  IonSearchbar,
  IonLabel,
  IonPopover,
  IonItemDivider,
  IonRow,
  IonCol,
  IonToggle,
  IonChip, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  barcodeOutline,
  checkmark,
  close,
  eyeOutline,
  refreshOutline,
  settings,
  trash,
} from 'ionicons/icons';
import { NavService } from 'src/app/Services/dialogServices/nav.service';
import { DataService } from 'src/app/Services/dialogServices/data.service';
import { DialogService } from 'src/app/Services/dialogServices/dialog.service';
import { ProcesseProviderService } from 'src/app/Services/processe-provider.service';

@Component({
  selector: 'app-operations-page',
  templateUrl: './operations-page.page.html',
  styleUrls: ['../../../../../style/operation-page.scss'],
  standalone: true,
  imports: [IonFooter, 
    IonChip,
    IonToggle,
    IonCol,
    IonRow,
    IonItemDivider,
    IonPopover,
    IonLabel,
    IonSearchbar,
    IonText,
    IonGrid,
    IonItem,
    IonInput,

    IonList,
    IonFabList,
    IonFabButton,
    IonFab,
    IonIcon,
    IonBackButton,
    IonButton,
    IonButtons,
    IonThumbnail,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    NgFor,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonSelectOption,
    IonSelect,
  ],
})
export class OperationsPagePage implements OnInit {
  ElookupItemGroup: { Name: string; Id: string }[] = [];
  ELookupUnitName: { Name: string }[] = [];
  ElookupCurrency: { Name: string; Id: string }[] = [];
  ElookupTarmeez: { Name: string; Id: number }[] = [];

  ELookupUnitNameSearch: { Name: string }[] = [];

  searchTerm: string = '';
  isUnitNameOpen = false;
  itemFormGroup: FormGroup = new FormGroup({
    GroupId: new FormControl(null),
    Name: new FormControl('', Validators.required),
    EnName: new FormControl(''),
    UnitName: new FormControl(null, Validators.required),
    Barcode: new FormControl(null),
    CurrencyId: new FormControl(1, Validators.required),
    StoreCurrencyId: new FormControl(1, Validators.required),
    Sort: new FormControl(null),
    MinVal: new FormControl(null),
    SystemId: new FormControl(null),
    PriceB: new FormControl(null),
    PriceS: new FormControl(null),
    MinPriceS: new FormControl(null),
    MaxPriceS: new FormControl(null),
    WholePriceS: new FormControl(null),
    SpecialPriceS: new FormControl(null),
    UseComm: new FormControl(false),
    CommKindId: new FormControl(1),
    

    CommVal: new FormControl(0),
    CostLessSale: new FormControl(false),
    AllowNeg: new FormControl(false),
    AllowNegForAllItem: new FormControl(false),
    IsExpire: new FormControl(false),
    IsNotifyExp: new FormControl(false),
    ExpDay: new FormControl(0),
    ExpMonth: new FormControl(0),
    ExpYear: new FormControl(0),
    AvgCostAtCurrentVal: new FormControl(false),
    IsScale: new FormControl(false),
    IsAutoGenerate: new FormControl(false),
    IsService: new FormControl(false),
    IsComplex: new FormControl(false),
  });

  constructor(
    public navService: NavService,
    private dataService: DataService,
    private dialog: DialogService
    , private processe: ProcesseProviderService
  ) {
    addIcons({
      checkmark,
      close,
      add,
      eyeOutline,
      settings,
      trash,
      refreshOutline,
      barcodeOutline,
    });
  }

  ngOnInit() {
    this.getElookup();
  }
  getElookup() {
    const data = this.dataService.getData();

    if (data) {
      this.ElookupItemGroup = data['ItemGroup'];
      this.ELookupUnitName = data['UnitName'];
      this.ElookupCurrency = data['Currency'];

      this.ElookupTarmeez = data['Tarmeez'];
    }
  }

  onSearchChange(event) {
    this.searchTerm = event.detail.value;
    this.filterData(this.searchTerm);
  }

  filterData(searchTerm) {
    if (searchTerm) {
      this.ELookupUnitNameSearch = this.ELookupUnitName.filter((s) =>
        s.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.ELookupUnitNameSearch = this.ELookupUnitName;
    }
  }
  async save() {
    if (this.itemFormGroup.valid) {
   
      await this.processe.add(
        'api/ItemApi/Add',
        this.itemFormGroup.value,
        'تم الحفظ بنجاح'
      );  
      console.log(this.itemFormGroup.value);
        }
  }

  clear() {
    this.dialog.AlertConfirm('هل تريد افرغ  جميع البيانات؟').then((res) => {
      if (res) {
        this.itemFormGroup.reset();
        this.itemFormGroup.patchValue({});
      }
    });
  }
  refresh() {
    this.dialog.AlertConfirm('هل تريد تحديث البيانات؟').then((res) => {
      if (res) {
        this.dataService.getElookupItem().finally(() => {
          this.getElookup();
        });
      }
    });
  }
  openPage(page: string) {
    switch (page) {
      case 'addItemGroup':
        this.dataService.getElookupItemGroup().finally(() => {
          this.navService.redirectTo('store/itemGroup/operationsPage');
        });
        break;
      case 'viewItemGroup':
        this.navService.redirectTo('store/itemGroup');
        break;
    }
  }
  setUnitName(Name) {
    this.itemFormGroup.patchValue({ UnitName: Name });
    this.isUnitNameOpen = false;
  }
  openUnitName() {
    this.isUnitNameOpen = true;
    this.ELookupUnitNameSearch = this.ELookupUnitName;
  }
  toggleAllowNegForAllItemGroup() {
    if (!this.itemFormGroup.value.AllowNegForAllItem) {
      this.dialog
        .AlertConfirm(
          'هل تريد تطبيق خاصة السماح بالكميات السالبة على جميع اصناف هذه المجموعة؟'
        )
        .then((res) => {
          if (res) {
            this.itemFormGroup.patchValue({
              AllowNegForAllItem: true,
            });
          }
        });
    } else {
      this.itemFormGroup.patchValue({
        AllowNegForAllItem: false,
      });
    }
  }
  IsNotifyExp() {
    this.dialog.createPickerDate().then((res) => {
      if (res) {
        this.itemFormGroup.patchValue({
          IsNotifyExp: true,
          ExpDay: res.day.value,
          ExpMonth: res.month.value,
          ExpYear: res.year.value,
        });
      }
    });
  }
  

}

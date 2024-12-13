import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonThumbnail,
  IonItem,
  IonLabel,
  IonRow,
  IonGrid,
  IonCol,
  IonChip,
  IonButton,
  InfiniteScrollCustomEvent ,
  IonIcon,
  IonListHeader,
  IonToggle,
  IonList,  
  IonSelect,
  IonSelectOption,
  IonModal,
  IonFabButton,
  IonFab,
  IonInput,
  IonText, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { ProcesseProviderService } from 'src/app/Services/processe-provider.service';
import { ItemModel } from 'src/app/Models/StoreModel';
import { addIcons } from 'ionicons';
import {
  add,
  document,
  createOutline,
  trashOutline,
  printOutline,
  informationCircleOutline,
  settings,
  eyeOutline,
  barcodeOutline,
  bagAddOutline,
} from 'ionicons/icons';
import { DataService } from 'src/app/Services/dialogServices/data.service';
import { NavService } from 'src/app/Services/dialogServices/nav.service';
import { DialogService } from 'src/app/Services/dialogServices/dialog.service';
import { UpdateDataAlertService } from 'src/app/Services/dialogServices/update-data-alert.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, 
    IonText,
    IonInput,
    IonFab,
    IonFabButton,
    IonModal,
    IonList,
    IonToggle,
    IonListHeader,
    IonIcon,
    IonButton,
    IonChip,
    IonCol,
    IonGrid,
    IonRow,
    IonLabel,
    IonItem,
    IonBackButton,
    IonButtons,
    IonThumbnail,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSelect,
    IonSelectOption,
  ],
})
export class ItemPage implements OnInit {
  @ViewChild(IonModal, { static: true }) modal: IonModal;

  itemData: ItemModel[] = [];
  items: ItemModel;
  isModalOpenSettings = false;
  isModalOpenView = false;
  ElookupItemGroup: { Name: string; Id: string }[] = [];
  ElookupCurrency: { Name: string; Id: string }[] = [];
  ElookupTarmeez: { Name: string; Id: number }[] = [];
  Elookup: {
    NameGroup: string;
    NameCurrency: string;
    NameCurrency2: string;
    NameTarmeez: string;
  } = {
    NameGroup: '',
    NameCurrency: '',
    NameTarmeez: '',
    NameCurrency2: '',
  };

  constructor(
    private processe: ProcesseProviderService,
    private dataService: DataService,
    private nav: NavService,
    private dialog: DialogService,
    private updateDataAlert: UpdateDataAlertService
  ) {
    addIcons({
      add,
      document,
      createOutline,
      trashOutline,
      printOutline,
      informationCircleOutline,
      settings,
      eyeOutline,
      barcodeOutline,
      bagAddOutline
    });
  }

  ngOnInit() {}
  ionViewDidEnter() {
    this.getItem();
  }
  async openModal(type, item?) {
    this.modal.dismiss();
    this.isModalOpenView = false;
    this.isModalOpenSettings = false;
    this.items = item;

    if (type === 'View') {
      this.isModalOpenView = true;
      this.modal.present();
    }
    if (type === 'Settings') {
      this.isModalOpenSettings = true;
      this.processe.FindById('api/ItemApi/Find', this.items).then((res) => {
        this.items = res;
        this.items.OldId = this.items.Id;
        this.dataService.getElookupItem().finally(() => {
          this.getElookup();
          this.findLookup();
        });
      });
    }
  }
  getElookup() {
    const data = this.dataService.getData();

    if (data) {
      this.ElookupItemGroup = data['ItemGroup'];
      this.ElookupCurrency = data['Currency'];

      this.ElookupTarmeez = data['Tarmeez'];
    }
  }
  async getItem() {
    const res = await this.processe.getListAsString('api/ItemApi/GetAll');
    this.itemData = res;
  }
  async deleteItem(item) {
    this.dialog.AlertConfirm('هل تريد حذف ' + item.Name + '؟').then((res) => {
      if (res) {
        this.processe
          .delete('api/ItemApi/Delete', item, 'تم الحذف بنجاح')
          .then((res) => {
            if (res) this.getItem();
          });
      }
    });
  }
  findLookup() {
    this.Elookup.NameGroup =
      this.ElookupItemGroup.find((x) => x.Id === this.items.GroupId)?.Name ||
      ' لم يتم الاختيار';
    this.Elookup.NameCurrency =
      this.ElookupCurrency.find(
        (x) => x.Id == this.items.CurrencyId?.toString()
      )?.Name || ' لم يتم الاختيار';
    this.Elookup.NameCurrency2 =
      this.ElookupCurrency.find(
        (x) => x.Id == this.items.StoreCurrencyId?.toString()
      )?.Name || ' لم يتم الاختيار';
    this.Elookup.NameTarmeez =
      this.ElookupTarmeez.find((x) => x.Id === this.items.SystemId)?.Name ||
      ' لم يتم الاختيار';
  }
  async UpdateData(title) {
    switch (title) {
      case 'Group':
        this.updateDataAlert
          .updateData(
            '    تعديل المجموعة الرئيسية',
            { Id: this.items.GroupId, DataSelect: this.ElookupItemGroup },
            'select'
          )
          .then((res) => {
            if (res) {
              this.items.GroupId = res.Id;

              this.Elookup.NameGroup = res.Name;
            }
          });
        break;
      case 'Unit':
        this.updateDataAlert
          .updateData('    تعديل الوحدة', this.items.UnitName, 'text')
          .then((res) => {
            if (res) {
              this.items.UnitName = res;
              this.items.DefaultUnitName = res;
            }
          });

        break;
      case 'Name':
        this.updateDataAlert
          .updateData('    تعديل اسم الصنف', this.items.Name, 'text')
          .then((res) => {
            if (res) this.items.Name = res;
          });
        break;

      case 'Sort':
        this.updateDataAlert
          .updateData('    تعديل ترتيب الصنف', this.items.Sort, 'number')
          .then((res) => {
            if (res) this.items.Sort = res;
          });
        break;
      case 'Min':
        this.updateDataAlert
          .updateData(
            '    تعديل الحد الادنى للنصف',
            this.items.MinVal,
            'number'
          )
          .then((res) => {
            if (res) this.items.MinVal = res;
          });
        break;
      case 'System':
        this.updateDataAlert
          .updateData(
            '    تعديل النظام',
            { Id: this.items.SystemId, DataSelect: this.ElookupTarmeez },
            'select'
          )
          .then((res) => {
            if (res) {
              this.items.SystemId = res.Id;
              this.Elookup.NameTarmeez = res.Name;
            }
          });

        break;

      case 'Currency':
        this.updateDataAlert
          .updateData(
            '    تعديل العملة',
            { Id: this.items.CurrencyId, DataSelect: this.ElookupCurrency },
            'select'
          )
          .then((res) => {
            if (res) {
              this.items.CurrencyId = res.Id;
              this.Elookup.NameCurrency = res.Name;
            }
          });

        break;

      case 'GroupCurrency':
        this.updateDataAlert
          .updateData(
            '    تعديل عملة المجموعة',
            {
              Id: this.items.StoreCurrencyId,
              DataSelect: this.ElookupCurrency,
            },
            'select'
          )
          .then((res) => {
            if (res) {
              this.items.StoreCurrencyId = res.Id;
              this.Elookup.NameCurrency2 = res.Name;
            }
          });
        break;
      case 'PriceB':
        this.updateDataAlert
          .updateData('    تعديل السعر الافتراضي', this.items.PriceB, 'number')
          .then((res) => {
            if (res) this.items.PriceB = res;
          });
        break;
      case 'PriceS':
        this.updateDataAlert
          .updateData('    تعديل سعر البيع', this.items.PriceS, 'number')
          .then((res) => {
            if (res) this.items.PriceS = res;
          });
        break;
      case 'MinPriceS':
        this.updateDataAlert
          .updateData(
            '    تعديل الحد الادنى للسعر',
            this.items.MinPriceS,
            'number'
          )
          .then((res) => {
            if (res) this.items.MinPriceS = res;
          });
        break;
      case 'MaxPriceS':
        this.updateDataAlert
          .updateData(
            '    تعديل الحد الاقصى للسعر',
            this.items.MaxPriceS,
            'number'
          )
          .then((res) => {
            if (res) this.items.MaxPriceS = res;
          });
        break;
      case 'WholePriceS':
        this.updateDataAlert
          .updateData(
            '    تعديل السعر للجملة',
            this.items.WholePriceS,
            'number'
          )
          .then((res) => {
            if (res) this.items.WholePriceS = res;
          });
        break;
        case 'IsNotifyExp':
        if (this.items.IsNotifyExp) this.items.IsNotifyExp = false;
        else
          this.dialog.createPickerDate().then((res) => {
            if (res) {
              this.items.IsNotifyExp = true;
              this.items.ExpDay = res.day.value;
              this.items.ExpMonth = res.month.value;
              this.items.ExpYear = res.year.value;
            }
          });
        break;
        case 'CommVal':
        this.updateDataAlert
          .updateData(
            '    تعديل قيمة العمولة',
            this.items.CommVal,
            'number'
          )
          .then((res) => {
            if (res) this.items.CommVal = res;
          });
        break;
    }
  }
  SettingsSave() {
    this.updateDataAlert.settingsSave().then((res) => {
      if (res)
        this.processe
          .edit('api/ItemApi/Update', this.items, 'تم التعديل بنجاح')
          .then((res) => {
            if (res) this.getItem();
          });
    });
  }
  openPage(type, item?) {
if (type === 'add') {
    this.dataService.getElookupItem().finally(() => {
      this.nav.redirectTo('store/item/operationsPage');
    });
  }    
  else if (type === 'itemUnit') {
       
      this.dataService.setData({
        item: item,
      });
      this.nav.redirectTo('store/item/itemUnit');

    }

  }
  async refresh() {
    this.itemData.push(...this.itemData);
  }


  onIonInfinite(ev) {
    this.refresh();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  }


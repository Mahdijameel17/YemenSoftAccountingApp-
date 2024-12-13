import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonThumbnail,
  IonIcon,
  IonFabButton,
  IonFab,
  IonModal,
  IonButtons,
  IonButton,
  IonList,
  IonCol,
  IonRow,
  IonChip,
  IonLabel,
  IonItem,
  IonGrid,
  IonListHeader,
  IonBackButton,
  IonToggle,
  IonText,
} from '@ionic/angular/standalone';
import { DataService } from 'src/app/Services/dialogServices/data.service';
import { ItemModel, ItemUnitModel } from 'src/app/Models/StoreModel';
import { ProcesseProviderService } from 'src/app/Services/processe-provider.service';
import { UpdateDataAlertService } from 'src/app/Services/dialogServices/update-data-alert.service';
import { DialogService } from 'src/app/Services/dialogServices/dialog.service';

@Component({
  selector: 'app-item-unit',
  templateUrl: './item-unit.page.html',
  standalone: true,
  imports: [
    IonText,
    IonToggle,
    IonBackButton,
    IonThumbnail,
    IonListHeader,
    IonGrid,
    IonItem,
    IonLabel,
    IonChip,
    IonRow,
    IonCol,
    IonList,
    IonButton,
    IonButtons,
    IonModal,
    IonFab,
    IonFabButton,
    IonIcon,
    IonContent,
    ReactiveFormsModule,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ItemUnitPage implements OnInit {
  @ViewChild(IonModal, { static: true }) modal: IonModal;

  ItemUnitData: ItemUnitModel[] = [];
  ItemUnit: ItemUnitModel = {} as ItemUnitModel;

  item: ItemModel = {} as ItemModel;
  isAdd: boolean = false;
  isVild: boolean = false;

  constructor(
    private dataService: DataService,
    private processe: ProcesseProviderService,
    private updateDataAlert: UpdateDataAlertService,
    private dialog: DialogService
    
  ) {}

  ngOnInit() {
    this.getItemUnit();
  }
  getItemUnit() {
    const temp = this.dataService.getData();
    if (temp) {
      this.item = temp['item'];
      this.processe
        .FindById('api/ItemUnitApi/GetItemUnit', { ItemId: this.item?.Id })
        .then((res) => {
          this.ItemUnitData = res;
        });
    }
  }
  async openSettingsModal(item) {
    this.isAdd = false;

    this.ItemUnit = item;

    this.modal.present();
  }

  async openAddModal() {
    this.isAdd = true;
    this.ItemUnit = {} as ItemUnitModel;
    this.modal.present();
  }
  AddUnit() {
    if (
      this.ItemUnit.Name != null &&
      this.ItemUnit.Name != '' &&
      this.ItemUnit.Size != 0 &&
      this.ItemUnit.Size != null
    ) {
      this.isVild = false;
      this.ItemUnit.ItemId = this.item.Id;
      this.processe
        .add('api/ItemUnitApi/Add', this.ItemUnit, 'تم الحفظ بنجاح')
        .finally(() => {
          this.getItemUnit();
        });
    } else {
      this.isVild = true;
    }
  }
  calculatePrice() {
    if (this.ItemUnit.Size) {
      const firstItem = this.ItemUnitData.find((x) => x.Size === 1);
      if (firstItem) {
        const { Size } = this.ItemUnit;

        this.ItemUnit.PriceS =
          firstItem.PriceS != null ? Size * firstItem.PriceS : null;
        this.ItemUnit.PriceB =
          firstItem.PriceB != null ? Size * firstItem.PriceB : null;
        this.ItemUnit.SpecialPriceS =
          firstItem.SpecialPriceS != null
            ? Size * firstItem.SpecialPriceS
            : null;
        this.ItemUnit.MaxPriceS =
          firstItem.MaxPriceS != null ? Size * firstItem.MaxPriceS : null;
        this.ItemUnit.CommVal =
          firstItem.CommVal != null ? Size * firstItem.CommVal : null;
        this.ItemUnit.MinPriceS =
          firstItem.MinPriceS != null ? Size * firstItem.MinPriceS : null;
        this.ItemUnit.WholePriceS =
          firstItem.WholePriceS != null ? Size * firstItem.WholePriceS : null;
        this.ItemUnit.Barcode = firstItem.Barcode;
      }
    }
  }
  SettingsSave() {
    this.processe
      .edit('api/ItemUnitApi/Update', this.ItemUnit, 'تم التعديل بنجاح')
      .then((res) => {
        if (res) this.getItemUnit();
      });
  }
  async UpdateData(title) {
    switch (title) {
      case 'Name':
        this.updateDataAlert
          .updateData('    تعديل اسم الوحدة', this.ItemUnit.Name, 'text')
          .then((res) => {
            if (res) this.ItemUnit.Name = res;
          });
        break;

      case 'Size':
        this.updateDataAlert
          .updateData('    تعديل الكمية', this.ItemUnit.Size, 'number')
          .then((res) => {
            if (res) this.ItemUnit.Size = res;
            this.calculatePrice();
          });
        break;

      case 'PriceS':
        this.updateDataAlert
          .updateData('    تعديل سعر الوحدة', this.ItemUnit.PriceS, 'number')
          .then((res) => {
            if (res) this.ItemUnit.PriceS = res;
          });
        break;

      case 'PriceB':
        this.updateDataAlert
          .updateData('    تعديل سعر الوحدة', this.ItemUnit.PriceB, 'number')
          .then((res) => {
            if (res) this.ItemUnit.PriceB = res;
          });
        break;

      case 'SpecialPriceS':
        this.updateDataAlert
          .updateData(
            '    تعديل سعر الوحدة',
            this.ItemUnit.SpecialPriceS,
            'number'
          )
          .then((res) => {
            if (res) this.ItemUnit.SpecialPriceS = res;
          });
        break;

      case 'MaxPriceS':
        this.updateDataAlert
          .updateData('    تعديل سعر الوحدة', this.ItemUnit.MaxPriceS, 'number')
          .then((res) => {
            if (res) this.ItemUnit.MaxPriceS = res;
          });
        break;

      case 'CommVal':
        this.updateDataAlert
          .updateData('    تعديل سعر الوحدة', this.ItemUnit.CommVal, 'number')
          .then((res) => {
            if (res) this.ItemUnit.CommVal = res;
          });
        break;

      case 'MinPriceS':
        this.updateDataAlert
          .updateData('    تعديل سعر الوحدة', this.ItemUnit.MinPriceS, 'number')
          .then((res) => {
            if (res) this.ItemUnit.MinPriceS = res;
          });
        break;

      case 'WholePriceS':
        this.updateDataAlert
          .updateData(
            '    تعديل سعر الوحدة',
            this.ItemUnit.WholePriceS,
            'number'
          )
          .then((res) => {
            if (res) this.ItemUnit.WholePriceS = res;
          });
        break;
    }
  }
  async deleteItem(item) {
    console.log(item);
    this.dialog
      .AlertConfirm('هل تريد حذف هذه الوحدة؟')
      .then((res) => {
        if (res) {
          this.processe
            .delete('api/ItemUnitApi/Delete', item, 'تم الحذف بنجاح')
            .then((res) => {
              if (res) this.getItemUnit();
            });
        }
      });
  }
}

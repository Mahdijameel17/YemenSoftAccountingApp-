import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonThumbnail,
  IonText,
  IonLabel,
  IonCol,
  IonRow,
  IonModal,
  IonList,
  IonButton,
  IonListHeader,
  IonItem,
  IonChip,
  IonFabButton,
  IonFab,
  IonAvatar,
  IonImg,
  IonSearchbar,
  IonAlert,
  IonGrid,
  IonToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  document,
  createOutline,
  trashOutline,
  printOutline,
  informationCircleOutline,
  settings,
} from 'ionicons/icons';
import { OperationsPage } from 'src/app/enum/ELookup';
import { Router, RouterModule } from '@angular/router';
import { ItemGroupModel } from 'src/app/Models/StoreModel';
import { DataService } from 'src/app/Services/dialogServices/data.service';
import { ProcesseProviderService } from 'src/app/Services/processe-provider.service';
import { UpdateDataAlertService } from 'src/app/Services/dialogServices/update-data-alert.service';
import { DialogService } from 'src/app/Services/dialogServices/dialog.service';
@Component({
  selector: 'app-item-group',
  templateUrl: './item-group.page.html',
  standalone: true,
  imports: [
    IonToggle,
    IonGrid,
    IonAlert,
    IonSearchbar,
    IonImg,
    RouterModule,
    IonAvatar,
    IonModal,
    IonFab,
    IonFabButton,
    IonChip,
    IonItem,
    IonListHeader,
    IonButton,
    IonList,
    IonRow,
    IonCol,
    IonLabel,
    IonText,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonThumbnail,
    FormsModule,
    NgIf,
  ],
})
export class ItemGroupPage implements OnInit {
  @ViewChild(IonModal, { static: true }) modal: IonModal;

  itemGroups: ItemGroupModel[];
  itemGroup: ItemGroupModel;
  ElookupItemGroup: { Name: string; Id: string }[] = [];
  ElookupCurrency: { Name: string; Id: string }[] = [];
  ElookupTarmeez: { Name: string; ItemNo: number }[] = [];
  ElooKup: { NameParent: string; NameCurrency: string; NameTarmeez: string } = {
    NameParent: '',
    NameCurrency: '',
    NameTarmeez: '',
  };

  data: any;
  isExpire: boolean = false;
  allowNeg: boolean = true;
  costLessSale: boolean = false;

  page = OperationsPage;

  constructor(
    private updateDataAlert: UpdateDataAlertService,
    private router: Router,
    private dataService: DataService,
    private dialog: DialogService,
    private processe: ProcesseProviderService
  ) {
    addIcons({
      add: add,
      document: document,
      createOutline: createOutline,
      trashOutline: trashOutline,
      printOutline: printOutline,
      informationCircleOutline: informationCircleOutline,
      settings,
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.getItemGroup();
  }

  async getItemGroup() {
    const res = await this.processe.getListAsString('api/ItemGroupApi/GetAll');
    this.itemGroups = res;
  }
  async getElookup() {
    await this.dataService.getElookupItemGroup().finally(() => {
      const data = this.dataService.getData();

      if (data) {
        this.ElookupItemGroup = data['ItemGroup'];
        this.ElookupCurrency = data['Currency'];
        this.ElookupTarmeez = data['Tarmeez'];
      }
    });
  }

  async openModal(item: ItemGroupModel) {
    this.getElookup();
    this.itemGroup = item;
    this.itemGroup.OldId = this.itemGroup.Id;
    this.ElooKup.NameParent =
      this.ElookupItemGroup.find((x) => x.Id === this.itemGroup.ParentId)
        ?.Name || ' لم يتم الاختيار';
    this.ElooKup.NameCurrency =
      this.ElookupCurrency.find(
        (x) => x.Id == this.itemGroup.StoreCurrencyId.toString()
      )?.Name || ' لم يتم الاختيار';
   
    this.modal.present();
  }
  async UpdateData(title) {
    switch (title) {
      case 'Name':
        this.updateDataAlert
          .updateData('    تعديل اسم المجموعة', this.itemGroup.Name, 'text')
          .then((res) => {
            if (res) this.itemGroup.Name = res;
          });
        break;

      case 'Sort':
        this.updateDataAlert
          .updateData('    تعديل ترتيب المجموعة', this.itemGroup.Sort, 'number')
          .then((res) => {
            if (res) this.itemGroup.Sort = res;
          });
        break;

      case 'Parent':
        this.updateDataAlert
          .updateData(
            '    تعديل المجموعة الام',
            { Id: this.itemGroup.ParentId, DataSelect: this.ElookupItemGroup },
            'select'
          )
          .then((res) => {
            if (res) {
              this.itemGroup.ParentId = res.Id;

              this.ElooKup.NameParent = res.Name;
            }
          });
        break;

      case 'Currency':
        this.updateDataAlert
          .updateData(
            '    تعديل العملة',
            {
              Id: this.itemGroup.StoreCurrencyId,
              DataSelect: this.ElookupCurrency,
            },
            'select'
          )
          .then((res) => {
            if (res) {
              this.itemGroup.StoreCurrencyId = res.Id;

              this.ElooKup.NameCurrency = res.Name;
            }
          });
        break;
      case 'AllowNegForAllItemGroup':
        if (this.itemGroup.AllowNegForAllItemGroup)
          this.itemGroup.AllowNegForAllItemGroup = false;
        else
          this.dialog
            .AlertConfirm(
              'هل تريد تطبيق خاصة السماح بالكميات السالبة على جميع اصناف هذه المجموعة؟'
            )
            .then((res) => {
              if (res) {
                this.itemGroup.AllowNegForAllItemGroup = true;
              }
            });
        break;
      case 'IsNotifyExp':
        if (this.itemGroup.IsNotifyExp) this.itemGroup.IsNotifyExp = false;
        else
          this.dialog.createPickerDate().then((res) => {
            if (res) {
              this.itemGroup.IsNotifyExp = true;
              this.itemGroup.ExpDay = res.day.value;
              this.itemGroup.ExpMonth = res.month.value;
              this.itemGroup.ExpYear = res.year.value;
            }
          });
        break;

      case 'Tarmeez':
        this.updateDataAlert
          .updateData(
            '    تعديل الترميز',
            {
              Id: null,
              DataSelect: this.ElookupTarmeez,
            },
            'select'
          )
          .then((res) => {
            if (res) {
            }
          });
        break;
    }
  }

  SettingsSave() {
    this.updateDataAlert.settingsSave().then((res) => {
      if (res)
        this.processe
          .edit('api/ItemGroupApi/Update', this.itemGroup, 'تم التعديل بنجاح')
          .then((res) => {
            if (res) this.getItemGroup();
          });
    });

  }
  async deleteItem(item) {
    this.dialog
      .AlertConfirm('هل تريد حذف هذه المجموعة؟')
      .then((res) => {
        if (res) {
          this.processe
            .delete('api/ItemGroupApi/Delete', item, 'تم الحذف بنجاح')
            .then((res) => {
              if (res) this.getItemGroup();
            });
        }
      });
  }

  openPage() {
    this.dataService.getElookupItemGroup().finally(() => {
      this.router.navigate(['store/itemGroup/operationsPage']);
    });
  }
  
}

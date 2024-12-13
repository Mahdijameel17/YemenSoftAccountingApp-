import { Routes } from '@angular/router';
import { dialogGuard } from 'src/app/Services/dialogServices/dialog.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadComponent: () => import('./store.page').then((m) => m.StorePage),
  },
  {
    path: 'itemGroup',
    loadComponent: () => import('./item-group/item-group.page').then( m => m.ItemGroupPage)
  },
  {
    path: 'itemGroup/operationsPage',
    loadComponent: () => import('./item-group/operations-page/operations-page.page').then( m => m.OperationsPagePage),

  },
  {
    path: 'item',
    loadComponent: () => import('./item/item.page').then( m => m.ItemPage)
  },
  {
    path: 'item/operationsPage',
    loadComponent: () => import('./item/operations-page/operations-page.page').then( m => m.OperationsPagePage)
    
  },
  {
    path: 'item/itemUnit',
    loadComponent: () => import('./item/item-unit/item-unit.page').then( m => m.ItemUnitPage)
  },


];

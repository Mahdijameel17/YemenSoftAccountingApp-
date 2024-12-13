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

    loadComponent: () => import('./sales.page').then((m) => m.SalesPage),
  },
];

import { Routes } from '@angular/router';
import { authenticationGuard } from './Services/account/authentication.guard';
import { LoginPage } from './page/account/login/login.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginPage },
  {
    path: 'weather',
    loadComponent: () =>
      import('./page/countries/countries.page').then((m) => m.countriesPage),
    canActivate: [authenticationGuard],
  },
  {
    path: 'contrie/:id',
    loadComponent: () =>
      import('./page/countries/contries-detail/contries-detail.page').then(
        (m) => m.ContriesDetailPage
      ),
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./page/home/home.page').then((m) => m.HomePage),
    canActivate: [authenticationGuard],
  },
  {
    path: 'store',

    loadChildren: () =>
      import('./page/store/store.routes').then((m) => m.routes),
    canActivate: [authenticationGuard],
  },

  {
    path: 'sales',
    loadChildren: () =>
      import('./page/sales/sales.routes').then((m) => m.routes),
    canActivate: [authenticationGuard],
  },
];

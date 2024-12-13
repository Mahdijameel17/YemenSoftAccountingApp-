import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { DialogService } from './dialog.service';


export const dialogGuard: CanActivateFn = (route, state) => {
  const dialogService = inject(DialogService);
  dialogService.showLoading();

  setTimeout(() => {
    
    dialogService.hideLoading();
  }, 1000); 
  return true;

};





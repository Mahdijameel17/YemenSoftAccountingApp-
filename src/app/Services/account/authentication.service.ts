import { Injectable } from '@angular/core';
import { ApiProviderService } from '../api-provider.service';

import { ELookup } from '../../enum/ELookup';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isUserLoggedIn = false;

  constructor(
    private apiProvider: ApiProviderService,
    public jwtHelper: JwtHelperService,
    private router: Router
  ) {}
  // this.api.postData( data, 'api/Auth/login').then((res: any) => {

  async userLogin(request: any) {
    await this.apiProvider
      .postData('api/LoginApi/Authenticate', request)
      .then((response: any) => {
        if (response?.Data != null) {
          localStorage.setItem(ELookup.TOKEN_NAME, response?.Data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public logout() {
    localStorage.removeItem(ELookup.TOKEN_NAME);
    this.router
      .navigateByUrl('/login', { skipLocationChange: true })
      .then(() => this.router.navigate(['']));
  }
  public isAuthenticated(): boolean {
    // if(this.token != null && this.jwtHelper.isTokenExpired(this.token)){

    //    let token: any = localStorage.getItem(ELookup.REFRESH_TOKEN_NAME);
    //    localStorage.setItem(ELookup.TOKEN_NAME, token);
    // }

    this.isUserLoggedIn = !this.jwtHelper.isTokenExpired(this.token);
    return this.isUserLoggedIn;
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  get token() {
    let token: any = localStorage.getItem(ELookup.TOKEN_NAME);
    return token;
  }
  get username() {
    let tokenDecoded = this.jwtHelper.decodeToken(this.token);
    return tokenDecoded?.Name;
  }
  public get IdUser() {
    let tokenDecoded = this.jwtHelper.decodeToken(this.token);
    return tokenDecoded?.Id;
  }
}

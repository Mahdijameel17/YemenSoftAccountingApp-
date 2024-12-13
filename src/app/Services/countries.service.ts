import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
const url='https://weatherforecastapitest.azurewebsites.net/WeatherForecast';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private https:HttpClient) { 

  }
  getCountries():Observable<any>{
    const ruselt= this.https.get(url); 

    return(ruselt);

  }
  getCountriesById(id:number):Observable<any>{
    return this.https.get(url+"/"+id);
  }
  createCountries(add:any):Observable<any>{
   return this.https.post(url+"?summary="+add,{});
  }
  updateCountries(add:any):Observable<any>{
    return this.https.put(url+"/"+add?.id+"?summary="+add?.summary,{});
   }
   deleteCountries(id:number):Observable<any>{
    return this.https.delete(url+"/"+id);
   }
}

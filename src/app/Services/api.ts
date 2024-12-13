import { HttpClient, HttpHeaders, HttpRequest  } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {  
  serverUrl="http://desktop-tcq1ieo:8024/";  
  //serverUrl="http://localhost:31317/";
  baseUrl = "";
  public static loginInfo:any;
  public static PhoneRegex="^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$";

  constructor(public http: HttpClient) {
    this.baseUrl=this.serverUrl+"api/";    
  }

  getData(url): any{
  	return new Promise(resolve=>{
			this.http.get(this.baseUrl+url).subscribe((res)=>{					
			  		resolve(JSON.parse( res['_body']));
			  	}
			  	, (err)=>{
			  		console.log('error', err);
			  		resolve(null);
			  	}
		  	);
  	})
  }

  getListAsString(url): any{
	return new Promise(resolve=>{
		  this.http.get(this.baseUrl+url).subscribe((res)=>{
				  return res;
				}
				, (err)=>{
					console.log('error', err);
					resolve(null);
				}
			);
	});
	}

  deleteData(url){
    return new Promise(resolve=>{
    return this.http.delete(this.baseUrl+url).subscribe((data)=>{							   	
           resolve(data);
         }, (err)=>{
           console.log('err', err);
           resolve(null);
         });		
    });
  }

  postDataList(content,url): any{
	return new Promise(resolve=>{
		  this.http.post(this.baseUrl+url,content).subscribe((res)=>{										
					resolve(JSON.parse( res['_body']));
				}
				, (err)=>{
					console.log('error', err);
					resolve(null);
				}
			);
	})
}

  postData(content,url){
	return new Promise(resolve=>{
	return this.http.post(this.baseUrl+url, content).subscribe((data)=>{							   	
			   resolve(data);
		   }, (err)=>{
		   	console.log('err', err);
		   	resolve(null);
		   });		
	});
}

}
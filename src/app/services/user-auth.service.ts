import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor( private http: HttpClient ) { }
    
  getUser(token: string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get("http://localhost:4000/user/getUser", { headers } );
  }

  updateUser( token:string, name: string, email: string ){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post("http://localhost:4000/user/updateProfile", { name, email }, { headers } );
  }
   
  changePassword( token:string, oldPassword: string, newPassword: string ) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put("http://localhost:4000/user/changePassword", { oldPassword, newPassword }, { headers } );
  }

}

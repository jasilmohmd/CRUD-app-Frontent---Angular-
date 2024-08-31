import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private http:HttpClient) { }

  getUsers(token: string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get("http://localhost:4000/admin/getUsers", {headers})
  }

  getUser( token:string, id:string ){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`http://localhost:4000/admin/getUser/${id}`, { headers });
  }

  updateUser( token:string,id:string, name: string, email: string ){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.put(`http://localhost:4000/admin/updateUser/${id}`, { name, email }, { headers } );
  }

  deleteUser( token:string,id:string ){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.put(`http://localhost:4000/admin/deleteUser`, { id }, { headers } );
  }

}

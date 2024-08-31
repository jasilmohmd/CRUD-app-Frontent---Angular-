import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface IuploadToDb{
  message: string,
  url: string
}



@Injectable({
  providedIn: 'root'
})

export class ProfileUploadService {

  constructor( private http:HttpClient ) { }

  uploadToDb( token: string, url: string ){

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<IuploadToDb>("http://localhost:4000/user/uploadProfile", { url } , { headers });
  }

  uploadToDbAdmin( token: string, id:string, url: string ){

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.put<IuploadToDb>("http://localhost:4000/admin/uploadProfile", { id, url } , { headers });
  }

}

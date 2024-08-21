import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../Model/UserCredentials';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  data: User = { email: '', name: '', password: '' };

  constructor(private http: HttpClient, private router: Router){
    this.data.email="";
    this.data.name="";
    this.data.password="";
  }
  
  ngOnInit(): void {

    const token: string = localStorage.getItem('user') ?? '';
    console.log(token);
    

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get("http://localhost:4000/user/getUser", { headers } ).subscribe((res:any) => {
      console.log(res);
      this.data.email = res.email;
      this.data.name = res.name;
      console.log(this.data);
      
    })

  }

}

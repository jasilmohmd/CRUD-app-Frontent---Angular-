import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../Model/UserCredentials';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  data: User = { email: '', name: '', password: '' };

  constructor(private http: HttpClient, private router: Router) {}
  
  ngOnInit(): void {

    const token: string = localStorage.getItem('user') ?? '';
    console.log(token);
    

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get("http://localhost:4000/user/getUser", { headers } ).subscribe((res:any) => {

      setTimeout(() => {
        this.data.email = res.email;
        this.data.name = res.name;
      }, 1000);
      
      
    })

  }


}

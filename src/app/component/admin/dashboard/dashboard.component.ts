import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../Model/UserCredentials';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  users: [User] | null = null;

  constructor( private http:HttpClient, router:Router ){

  }

  ngOnInit(): void {
    
    this.http.get("http://localhost:4000/admin/getUsers").subscribe((res:any) => {
      
      setTimeout(() => {
        this.users = res.users;
      }, 1300);

    })

  }

}

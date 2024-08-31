import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class AdminLoginComponent {
  adminCred = {
    email : "",
    password : ""
  }

  constructor(private http: HttpClient, private router: Router){

  }

  onLogin(){
    this.http.post("http://localhost:4000/admin/login", this.adminCred).subscribe((res: any) => {
      if (res.token) {
        console.log(res.token);
        localStorage.setItem('admin', res.token)
        this.router.navigateByUrl("/admin/adminDashboard")
      }
      else{
        console.log("Invalid Credentials");
      }
    })
  }

}

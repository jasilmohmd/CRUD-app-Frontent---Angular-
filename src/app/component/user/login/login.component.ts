import { Component } from '@angular/core';
import { User } from '../../../Model/UserCredentials';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: User

  constructor(private http: HttpClient, private router: Router ) {
    this.loginObj = {
      name: "",
      password: "",
      email: ""
    }
  }

  onLogin() {
    this.http.post("http://localhost:4000/user/login", this.loginObj).subscribe((res: any) => {
      if (res.token) {
        // console.log(res.token);
        localStorage.setItem('user', res.token)
        this.router.navigateByUrl("/dashboard")
      }
    })




  }

}

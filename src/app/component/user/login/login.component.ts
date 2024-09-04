import { Component, inject } from '@angular/core';
import { User } from '../../../Model/UserCredentials';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: User

  userAuthService = inject(UserAuthService);

  constructor(private http: HttpClient, private router: Router ) {
    this.loginObj = {
      _id:"",
      name: "",
      password: "",
      email: "",
      profilePicture: ""
    }
  }

  onLogin() {
    this.userAuthService.userLogin(this.loginObj).subscribe((res: any) => {
      if (res.token) {
        // console.log(res.token);
        localStorage.setItem('user', res.token)
        this.router.navigateByUrl("/dashboard")
      }
      if(res.error){
        console.log(res.error);
      }
    })




  }

}

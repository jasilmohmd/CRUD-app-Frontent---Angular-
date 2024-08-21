import { Component } from '@angular/core';
import { User } from '../../../Model/UserCredentials';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  regObj: User;

  constructor( private http: HttpClient ){
    this.regObj = {
      name : "",
      password : "",
      email : ""
    }
  }

  onReg(){
    this.http.post("http://localhost:4000/user/register", this.regObj).subscribe((res:any)=> {
      if(res.message){
        console.log(res.message);
      }
    })
  }

}

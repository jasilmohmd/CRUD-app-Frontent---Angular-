import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {


  submit = false;

  oldPassword = "";
  newPassword = "";
  confirmPassword = "";

  userAuthService = inject(UserAuthService)

  constructor (private router: Router){}

  onSaveChanges(){
    const token: string = localStorage.getItem('user') as string;
    this.userAuthService.changePassword(token,this.oldPassword,this.newPassword).subscribe((res:any)=>{
      console.log(res);
      this.router.navigateByUrl("/dashboard")
    })
  }

}

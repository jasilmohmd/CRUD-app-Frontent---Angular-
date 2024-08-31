import { Component, inject, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {

  name:string = "";
  email:string = "";

  constructor(private router:Router) {}

  ngOnInit(): void {

    const token: string = localStorage.getItem('user') as string;

    this.userAuthService.getUser(token).subscribe((res:any) => {
      this.name = res.name;
      this.email = res.email;
    })  

  }

  userAuthService = inject(UserAuthService);

  

  onSubmit(){
    const token: string = localStorage.getItem('user') as string;
    this.userAuthService.updateUser(token,this.name,this.email).subscribe((res:any)=> {
      console.log(res);
      this.router.navigateByUrl("/dashboard")
    })
  }

}

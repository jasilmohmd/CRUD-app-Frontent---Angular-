import { Component, inject, OnInit } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminAuthService } from '../../../services/admin-auth.service';
import { User } from '../../../Model/UserCredentials';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  data:User = { _id:'', email: '', name: '', password: '' , profilePicture: '' }
  
  route = inject(ActivatedRoute);

  constructor(private router:Router){}
  ngOnInit(): void {

    const token: string = localStorage.getItem('admin') as string;

    this.data._id = this.route.snapshot.paramMap.get('id')!;
    // console.log(this.id);

    this.adminAuthService.getUser(token,this.data._id!).subscribe((res:any) => {
      
      setTimeout(() => {
        this.data = res.user;
      }, 0);

    })
    
  }

  adminAuthService = inject(AdminAuthService);

  onSubmit() {
    const token: string = localStorage.getItem('admin') as string;
    this.adminAuthService.updateUser(token,this.data._id,this.data.name,this.data.email).subscribe((res:any) => {
      console.log("hiiiii",res);
      this.router.navigateByUrl(`/admin/userDetails/${this.data._id}`)
    })
    
  }
}

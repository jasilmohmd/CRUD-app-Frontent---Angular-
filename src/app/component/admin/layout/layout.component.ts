import { Component } from '@angular/core';
import { AdminDashboardComponent } from '../dashboard/dashboard.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AdminDashboardComponent,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class AdminLayoutComponent {
  
  constructor(private router: Router){}

  logout(){
    localStorage.removeItem('admin')
    this.router.navigateByUrl('/adminLogin');
  }

}

import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AdminAuthService } from '../../../../services/admin-auth.service';
import { Router } from '@angular/router';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { User } from '../../../../Model/UserCredentials';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent implements OnInit {

  @Input() id!:string
  @Input() idx!:string
  @Output() close = new EventEmitter<void>();


  faTrashAlt =faTrashAlt

  constructor(private router:Router) {}

  adminAuthService = inject(AdminAuthService);

  ngOnInit(): void {
    
  }

  onClose(event: Event): void {
    event.stopPropagation();
    this.close.emit();
  }

  ondeleteUser(event: Event){
    event.stopPropagation();
    const token: string = localStorage.getItem('admin') ?? '';

    this.adminAuthService.deleteUser(token,this.id).subscribe((res:any) => {
      
      console.log(res);
      this.close.emit(); // Close the modal after deletion

    })
    // this.router.navigateByUrl("/admin/adminDashboard");
    
  }

}

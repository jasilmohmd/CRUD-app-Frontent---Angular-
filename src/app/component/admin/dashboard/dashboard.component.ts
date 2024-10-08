import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../../Model/UserCredentials';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AdminAuthService } from '../../../services/admin-auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import * as AdminActions from '../../../states/admin/admin.actions'
import * as AdminSelectors from '../../../states/admin/admin.selector'
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, DeleteModalComponent, AsyncPipe, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  faTrashAlt = faTrashAlt;
  faPencilAlt = faPencilAlt;

  activeModal: number | null = null; // Track the active modal

  users!: Observable<User[]>;
  error!: Observable<string | null>;

  filteredUsers$: Observable<User[]> = new Observable(); // Filtered users to be displayed
  searchQuery: string = ''; // Search query input

  adminAuthService = inject(AdminAuthService);
  route = inject(ActivatedRoute);

  constructor(private http: HttpClient, private router: Router, private store: Store) {
    const token = localStorage.getItem('admin') ?? '';
    this.store.dispatch(AdminActions.loadUsers({ token }));
    this.users = this.store.select(AdminSelectors.selectAllUsers);
    this.error = this.store.select(AdminSelectors.selectUsersError);
  }

  ngOnInit(): void {
    this.filterUsers(); // Initial filter (or reset)
  }

  filterUsers(): void {
    this.filteredUsers$ = this.users.pipe(
      map(users =>
        users.filter(user =>
          user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      )
    );
  }

  openModal(index: number, event: Event): void {
    event.stopPropagation();
    this.activeModal = index; // Set the active modal index
    console.log(this.activeModal);
  }

  closeModal(): void {
    this.activeModal = null; // Close the modal
    this.filterUsers(); // Reapply the filter to update the displayed users
  }
}

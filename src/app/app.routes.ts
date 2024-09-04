import { Routes } from '@angular/router';
import { LoginComponent } from './component/user/login/login.component';
import { RegisterComponent } from './component/user/register/register.component';
import { AdminLoginComponent } from './component/admin/login/login.component';
import { LayoutComponent } from './component/user/layout/layout.component';
import { DashboardComponent } from './component/user/dashboard/dashboard.component';
import { AdminDashboardComponent } from './component/admin/dashboard/dashboard.component';
import { AdminLayoutComponent } from './component/admin/layout/layout.component';
import { EditProfileComponent } from './component/user/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './component/user/change-password/change-password.component';
import { UserDetailsComponent } from './component/admin/user-details/user-details.component';
import { EditUserComponent } from './component/admin/edit-user/edit-user.component';
import { userAuthGuard } from './guards/user-auth.guard';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { successGuard } from './guards/success.guard';

export const routes: Routes = [
  { path:"", redirectTo:"login", pathMatch:'full' },
  { path: "login", component: LoginComponent, canActivate: [successGuard] },
  { path: "register", component: RegisterComponent },
  { path: "adminLogin", component: AdminLoginComponent, canActivate: [successGuard] },
  { path: "", component: LayoutComponent, canActivateChild: [userAuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "editProfile", component: EditProfileComponent },
      { path: "changePassword", component: ChangePasswordComponent }
    ]
   },
   { path: "admin", component: AdminLayoutComponent,canActivateChild: [adminAuthGuard],
    children: [
      { path: "adminDashboard", component: AdminDashboardComponent },
      { path: "userDetails/:id", component: UserDetailsComponent },
      { path: "editUser/:id", component: EditUserComponent }
    ]
    }
];

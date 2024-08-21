import { Routes } from '@angular/router';
import { LoginComponent } from './component/user/login/login.component';
import { RegisterComponent } from './component/user/register/register.component';
import { AdminLoginComponent } from './component/admin/login/login.component';
import { LayoutComponent } from './component/user/layout/layout.component';
import { DashboardComponent } from './component/user/dashboard/dashboard.component';
import { AdminDashboardComponent } from './component/admin/dashboard/dashboard.component';
import { AdminLayoutComponent } from './component/admin/layout/layout.component';

export const routes: Routes = [
  { path:"", redirectTo:"login", pathMatch:'full' },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "adminLogin", component: AdminLoginComponent },
  { path: "", component: LayoutComponent,
    children: [
      { path: "dashboard", component: DashboardComponent }
    ]
   },
   { path: "admin", component: AdminLayoutComponent,
    children: [
      { path: "adminDashboard", component: AdminDashboardComponent }
    ]
    }
];

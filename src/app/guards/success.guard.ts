import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const successGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  const admin: string = localStorage.getItem('admin') ?? '';
  const user: string = localStorage.getItem('user') ?? '';
  if(admin){
    router.navigateByUrl("/admin/adminDashboard")
    return false;
  }
  if(user){
    router.navigateByUrl("/dashboard")
    return false;
  }
  return true;
};

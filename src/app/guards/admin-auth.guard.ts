import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const token: string = localStorage.getItem('admin') ?? '';
  if (token) {
    return true;
  } else {
    router.navigateByUrl("/adminLogin")
    return false;
  }
};

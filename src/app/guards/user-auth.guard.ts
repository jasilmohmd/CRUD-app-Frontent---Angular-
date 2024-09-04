import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const userAuthGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const token: string = localStorage.getItem('user') ?? '';
  if(token){
    return true;
  }else{
    router.navigateByUrl("/login")
    return false;
  }
  
};

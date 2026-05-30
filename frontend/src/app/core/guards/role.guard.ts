import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models';

export const roleGuard = (roles: UserRole[]): CanActivateFn => () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const role = auth.role();
  if (role && roles.includes(role)) return true;
  router.navigate(['/']);
  return false;
};

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snack = inject(MatSnackBar);
  const auth = inject(AuthService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const msg = (Array.isArray(err.error?.message) ? err.error.message.join(', ') : err.error?.message) ||
        'Une erreur est survenue.';
      if (err.status === 401 && auth.isLogged()) {
        auth.logout();
        router.navigate(['/connexion']);
      }
      snack.open(msg, 'Fermer', { duration: 4000 });
      return throwError(() => err);
    }),
  );
};

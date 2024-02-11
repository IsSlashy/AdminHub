import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(state: RouterStateSnapshot) {
    const token = localStorage.getItem('access-token');
    if (token === null) {
      this.router.navigate(['/connection'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    } else {
      const decoded: any = token === '' ? null : jwt_decode(token);
      if (
        Date.now() / 1000 >= decoded.exp ||
        !['graphile_starter_admin'].includes(decoded.role)
      ) {
        localStorage.removeItem('access-token');
        this.router.navigate(['/connection'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      } else {
        return true;
      }
    }
  }
}

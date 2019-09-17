import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import * as fromApp from '../../Store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class AuthGard implements CanActivate {
  constructor(private authservice: AuthService,
              private router: Router,
              private  store: Store<fromApp.AppState>) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
         return authState.user;
      }),
      map(users => {
        const isAuth = !!users;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }

}

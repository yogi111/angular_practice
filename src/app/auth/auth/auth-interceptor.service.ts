import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {AuthService} from './auth.service';
import { exhaustMap, map, take } from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as fromApp from '../../Store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth')
        .pipe(take(1),
            map(authState => {
                return authState.user;
            })
            , exhaustMap(user => {
             if (!user) {
               return next.handle(req);
             }
             const ModifiedReq = req.clone({
               params: new HttpParams().set('auth', user.token)
             });
             return  next.handle(ModifiedReq);
            }));
  }
}

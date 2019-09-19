import {Injectable} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../Store/app.reducer';
import * as AuthAction from '../../auth/store/auth.action';


@Injectable({providedIn : 'root'})
export class AuthService {
  logouttimer: any;
  constructor(private store: Store<fromApp.AppState>) { }

  SetLogoutTimer( authExpirationtime: number) {
    this.logouttimer = setTimeout(() => {
      this.store.dispatch(new AuthAction.Logout());
    }, authExpirationtime);
  }
  ClearLogoutTimer(){
    if (this.logouttimer) {
      clearTimeout(this.logouttimer);
    }
  }
}

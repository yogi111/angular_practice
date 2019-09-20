import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../app/Store/app.reducer';
import * as AuthActions from '../app/auth/store/auth.action';

import { map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    UserSub: Subscription;
    IsAuthenticated = false;

    constructor(private authservice: AuthService,
                private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
        this.store.dispatch(new AuthActions.AutoLogin());
        this.UserSub = this.store.select('auth')
            .pipe(map(authState => {
                console.log(authState);
                return authState.user;
            }))
            .subscribe((user) => {
                this.IsAuthenticated = !!user;
            });
    }

    ngOnDestroy() {
        this.UserSub.unsubscribe();
    }
}

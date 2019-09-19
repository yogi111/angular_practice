import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from '../../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../../Store/app.reducer';
import * as authActions from '../store/auth.action';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    loginmode = false;
    loading = false;
    error: string = null;
    AlertSub: Subscription;
    storeSub: Subscription;
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

    constructor(private cmpFtry: ComponentFactoryResolver,
                private store: Store<fromApp.AppState>) {
    }

    authanticate(Auth: NgForm) {
        if (!Auth.value) {
            return;
        } else {
            const email = Auth.value.email;
            const password = Auth.value.password;
            if (this.loginmode) {
                this.store.dispatch(new authActions.LoginStart({ email, password }));
            } else {
                this.store.dispatch(new authActions.SignupStart({ email, password }));
            }
        }
        Auth.reset();
    }

    switchmode() {
        this.loginmode = !this.loginmode;
    }

    CretateAlert(message: string) {

        const alertcmpFtry = this.cmpFtry.resolveComponentFactory(AlertComponent);

        const HostRef = this.alertHost.viewcontainerref;
        HostRef.clear();

        const alertcmpref = HostRef.createComponent(alertcmpFtry);

        alertcmpref.instance.message = message;
        this.AlertSub = alertcmpref.instance.close.subscribe(() => {
            this.AlertSub.unsubscribe();
            HostRef.clear();
        });
    }

    ngOnInit() {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.loading = authState.loading;
            this.error = authState.authError;
            if (this.error) {
                this.CretateAlert(this.error);
            }
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
}

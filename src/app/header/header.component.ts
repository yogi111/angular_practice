import { Component, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth/auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as FromApp from '../Store/app.reducer';
import { map } from 'rxjs/operators';
import * as Authaction from '../auth/store/auth.action';
import * as Recipeaction from '../recipes/store/recipe.action';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Output() featureSelected = new EventEmitter<string>();
    collapsed = false;
    UserSub: Subscription;
    RecipeSub: Subscription;
    IsAuthenticated = false;
    errorMsg: string;
    AlertSub: Subscription;
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;


    constructor(private Authservice: AuthService,
                private cmpFtry: ComponentFactoryResolver,
                private store: Store<FromApp.AppState>,
                private route: Router) {
    }

    ngOnInit() {
        this.UserSub = this.store.select('auth')
            .pipe(map(AuthState => {
                return AuthState.user;
            }))
            .subscribe((user) => {
                this.IsAuthenticated = !!user;
            });
        this.RecipeSub = this.store.select('recipes')
            .subscribe((authstate) => {
                if (authstate.error) {
                    this.errorMsg = authstate.error;
                    if (this.errorMsg != null) {
                        this.Createalert(this.errorMsg);
                    }
                }
            });
    }

    savedata() {
        this.store.select('recipes').subscribe((respData) => {
            this.store.dispatch(new Recipeaction.SaveRecipe(respData.recipes));
        });
    }

    fetchdata() {
        this.store.dispatch(new Recipeaction.FetchRecipe());
    }

    onLogout() {
        this.store.dispatch(new Authaction.Logout());
        this.route.navigate(['auth']);
    }

    Createalert(message: string) {
        const alertcmpFtry = this.cmpFtry.resolveComponentFactory(AlertComponent);

        const HostRef = this.alertHost.viewcontainerref;
        HostRef.clear();

        const alertcmpref = HostRef.createComponent(alertcmpFtry);

        alertcmpref.instance.message = message;
        this.AlertSub = alertcmpref.instance.close.subscribe(() => {
            this.AlertSub.unsubscribe();
            HostRef.clear();
        });
        this.store.dispatch(new Recipeaction.FetchRecipeFailAccept());
    }

    ngOnDestroy() {
        this.UserSub.unsubscribe();
        this.store.select('recipes').subscribe();
    }
}

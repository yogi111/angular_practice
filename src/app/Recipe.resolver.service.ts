import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipes/recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../app/Store/app.reducer';
import * as RecipeActions from '../app/recipes/store/recipe.action';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(private store: Store<fromApp.AppState>,
                private route: ActivatedRoute,
                private router: Router,
                private action$: Actions) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('recipes').pipe(
            take(1),
            map(recipeState => {
                return recipeState.recipes;
            }),
            switchMap(recipes => {
                console.log(recipes);
                if (recipes.length === 0) {
                    this.store.dispatch(new RecipeActions.FetchRecipe());
                    return this.action$.pipe(
                        ofType(RecipeActions.SET_RECIPE),
                        take(1)
                    );
                } else {
                    return of(recipes);
                }
            })
        );
    }
}


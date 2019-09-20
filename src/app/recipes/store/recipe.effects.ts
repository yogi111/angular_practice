import { Actions, Effect, ofType } from '@ngrx/effects';
import * as recipeactions from '../store/recipe.action';
import { map, switchMap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import * as recipeAction from './recipe.action';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipe = this.action$.pipe(
        ofType(recipeactions.FETCH_RECIPE),
        switchMap(() => {
            return this.http.get<Recipe[]>('https://angular-course-project-5c4e3.firebaseio.com/recipe.json');
        }),
        map(recipes => {
            if (!recipes) {
                return new recipeAction.FetchRecipeFail('There is No recipes, create 1st Recipe by clicking New Recipe Button');
            } else {
                return new recipeAction.SetRecipe(recipes);
            }
        })
    );
    @Effect({dispatch: false})
    saveRecipe = this.action$.pipe(
        ofType(recipeactions.SAVE_RECIPE),
        switchMap((authData: recipeAction.SaveRecipe) => {
            return this.http.put<Recipe[]>('https://angular-course-project-5c4e3.firebaseio.com/recipe.json', authData.payload);
        }),
    );

    constructor(private action$: Actions, private http: HttpClient) {
    }
}

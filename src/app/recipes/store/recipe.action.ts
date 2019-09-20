import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPE = '[Recipe] set recipe';
export const FETCH_RECIPE = '[Recipe] fetch recipe';
export const FETCH_RECIPE_FAIL = '[Recipe] fetch recipe fail';
export const FETCH_RECIPE_FAIL_ACCEPT = '[Recipe] fetch recipe fail recognized';
export const SAVE_RECIPE = '[Recipe] Save recipe';
export const UPDATE_RECIPE = '[Recipe] update recipe';
export const DELETE_INGRDIENT_RECIPE = '[Recipe] delete ingredient recipe';
export const DELETE_RECIPE = '[Recipe] delete recipe';
export const ADD_RECIPE = '[Recipe] add recipe';


export class SetRecipe implements Action {
    readonly type = SET_RECIPE;

    constructor(public payload: Recipe[]) {
    }
}

export class FetchRecipe implements Action {
    readonly type = FETCH_RECIPE;
}

export class FetchRecipeFail implements Action {
    readonly type = FETCH_RECIPE_FAIL;

    constructor(public payload: string) {
    }
}

export class FetchRecipeFailAccept implements Action {
    readonly type = FETCH_RECIPE_FAIL_ACCEPT;
}

export class SaveRecipe implements Action {
    readonly type = SAVE_RECIPE;

     constructor(public payload: Recipe[]) {
    }
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;

    constructor(public payload: { index: number, updateRecipe: Recipe }) {
    }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGRDIENT_RECIPE;

    constructor(public payload: { Rindex: number, Iindex: number }) {
    }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;

    constructor(public payload: number) {
    }
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) {
    }
}

export  type RecipeAction =
    SetRecipe
    | FetchRecipe
    | FetchRecipeFail
    | FetchRecipeFailAccept
    | SaveRecipe
    | UpdateRecipe
    | DeleteIngredient
    | DeleteRecipe
    | AddRecipe;

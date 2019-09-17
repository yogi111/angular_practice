import { Action } from '@ngrx/store';
import { Ingredients } from '../../shared/ingredients.model';

export const ADD_INGREDIENT = '[ShoppingList] Add Ingredient';
export const ADD_INGREDIENTS = '[ShoppingList] Add Ingredients';
export const UPDATE_INGREDIENT = '[ShoppingList] Update Ingredient';
export const DELETE_INGREDIENT = '[ShoppingList] Delete Ingredient';
export const START_EDIT = '[ShoppingList] Start Edit';
export const END_EDIT = '[ShoppingList] End Edit';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredients) { }
}
export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredients[]) { }
}
export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: Ingredients) { }
}
export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number ) { }
}

export class EndEdit implements Action {
    readonly type = END_EDIT;
}


export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | EndEdit;

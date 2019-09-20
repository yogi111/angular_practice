import * as fromShoppingList from '../shopping-list/STORE/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRecipe from '../recipes/store/recipe.reducer';

export interface AppState {
    shoppinglist: fromShoppingList.State;
    auth: fromAuth.State;
    recipes: fromRecipe.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.AuthReducer,
    shoppinglist: fromShoppingList.shoppingListReducer,
    recipes: fromRecipe.recipeReducer,
};

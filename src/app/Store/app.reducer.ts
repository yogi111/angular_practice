import * as fromShoppingList from '../shopping-list/STORE/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppinglist: fromShoppingList.State;
    auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.AuthReducer,
    shoppinglist: fromShoppingList.shoppingListReducer,
};

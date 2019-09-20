import { Injectable } from '@angular/core';
import { Ingredients } from './shared/ingredients.model';
import { Store } from '@ngrx/store';
import * as shoppingListAction from './shopping-list/STORE/shopping-list.action';
import * as shoppingListReducer from './shopping-list/STORE/shopping-list.reducer';


@Injectable()
export class RecipeService {
    selectedIng: Ingredients[];
    constructor(private store: Store<shoppingListReducer.State>) {
    }
    addIngToSl() {
        this.store.dispatch(new shoppingListAction.AddIngredients(this.selectedIng));
    }
}

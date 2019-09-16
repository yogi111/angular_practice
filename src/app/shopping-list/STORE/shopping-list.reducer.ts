import { Ingredients } from '../../shared/ingredients.model';
import * as shoppingListAction from './shopping-list.action';

export interface state {
    ingredients: Ingredients[];
    editedIngredient: Ingredients;
    editedIngredientIndex: number;
}
export interface AppState {
    shoppinglist: state;
}
const initialstate: state = {
    ingredients: [new Ingredients('apple', 5) ,
    new Ingredients('potatoes', 7) ,
    new Ingredients('tomatoes', 4) ,
    new Ingredients('banana', 8) ],
    editedIngredient: null,
    editedIngredientIndex: -1}

export function shoppingListReducer(state = initialstate , action: shoppingListAction.ShoppingListActions) {
    switch (action.type) {
        case shoppingListAction.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients , action.payload ]
            };
        case shoppingListAction.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients , ...action.payload ]
            };
        case shoppingListAction.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig , igindex) => {
                    return igindex !== action.payload;
                })
            };
        case shoppingListAction.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const updatedingredients = state.ingredients;
            updatedingredients[action.payload.index] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedingredients
            };
        default:
            return state;

    }
}

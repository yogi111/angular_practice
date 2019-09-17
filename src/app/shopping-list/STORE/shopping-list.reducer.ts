import { Ingredients } from '../../shared/ingredients.model';
import * as shoppingListAction from './shopping-list.action';

export interface State {
    ingredients: Ingredients[];
    editedIngredient: Ingredients;
    editedIngredientIndex: number;
}

const initialstate: State = {
    ingredients: [new Ingredients('apple', 5),
        new Ingredients('potatoes', 7),
        new Ingredients('tomatoes', 4),
        new Ingredients('banana', 8)],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialstate, action: shoppingListAction.ShoppingListActions): State {
    switch (action.type) {
        case shoppingListAction.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case shoppingListAction.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case shoppingListAction.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igindex) => {
                    return igindex !== state.editedIngredientIndex;
                }),
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case shoppingListAction.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updatedingredients = state.ingredients;
            updatedingredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case shoppingListAction.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            };
        case shoppingListAction.END_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        default:
            return state;

    }
}

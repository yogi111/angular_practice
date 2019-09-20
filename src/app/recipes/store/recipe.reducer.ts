import { Recipe } from '../recipe.model';
import * as recipeAction from './recipe.action';

export interface State {
    recipes: Recipe[];
    error: string;
    selectedindex: number;
}

const initialState: State = {
    recipes: [],
    error: null,
    selectedindex: -1

};

export function recipeReducer( state = initialState, action: recipeAction.RecipeAction ) {
    switch (action.type) {
        case recipeAction.SET_RECIPE:
            console.log('set ', action.payload);
            return {
                ...state,
                recipes : [...action.payload],
                error: null,
                selectedindex: -1
            };
        case recipeAction.FETCH_RECIPE_FAIL:
            console.log('fetch fail' , action.payload);
            return {
                ...state,
                recipes: [...state.recipes],
                error: action.payload,
                selectedindex: -1,
            };
        case recipeAction.FETCH_RECIPE_FAIL_ACCEPT:
            console.log('fatch fail acc', action);
            return {
                ...state,
                recipes: [...state.recipes],
                error: null,
                selectedindex: -1
            };
        case recipeAction.ADD_RECIPE:
            console.log('add', action.payload);
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
                error: null,
                selectedindex: -1
            };
        case recipeAction.UPDATE_RECIPE:
            console.log('update', action.payload);
            const recipe = state.recipes[action.payload.index];
            const updaterecipe = {
                ...recipe,
                ...action.payload.updateRecipe
            };
            const updaterecipes = state.recipes;
            updaterecipes[action.payload.index] = updaterecipe;
            return  {
                ...state,
                recipes: updaterecipes,
                error: null,
                selectedindex: -1
            };
        case recipeAction.DELETE_INGRDIENT_RECIPE:
            const Srecipe = state.recipes[action.payload.Rindex];
            const SIng = Srecipe.ingredients;
            SIng.splice(action.payload.Iindex, 1);
            Srecipe.ingredients = SIng;
            const returnable = state.recipes;
            return  {
                ...state,
                recipes: returnable,
                error: null,
                selectedindex: -1
            };
        case recipeAction.DELETE_RECIPE:
            const CurrRecipes = state.recipes;
            CurrRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: CurrRecipes,
                error: null,
                selectedindex: -1
            };
        default:
            console.log('default', state.recipes);
            return state;
    }
}

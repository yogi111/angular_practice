import {Recipe} from "./recipes/recipe.model";
import { Injectable } from "@angular/core";
import {Ingredients} from "./shared/ingredients.model";
import {ReplaySubject} from "rxjs";
import { Store } from '@ngrx/store';
import * as shoppingListAction from './shopping-list/STORE/shopping-list.action';
import * as shoppingListReducer from './shopping-list/STORE/shopping-list.reducer';


@Injectable()
export class RecipeService {
  DeleteIngredient = new ReplaySubject<Ingredients[]>(10);
  RecipesUpdated =  new ReplaySubject<Recipe[]>(10);
  RecipeFetched =  new ReplaySubject<Recipe[]>(10);

  selectedIng: Ingredients[];
  private recipes: Recipe[] = [];
  constructor(private store: Store<shoppingListReducer.State>) {}
  Loadrecipes(recipes: Recipe[]) {
  if(this.recipes.length < 1) {
    this.recipes.push(...recipes);
    this.RecipeFetched.next(this.recipes);
  } else {
    if (this.recipes.length === recipes.length) {
      console.log('threre is no need of fetching');
    }
  }
  }
  getrecipes() {
    return this.recipes.slice();
  }
  updaterecipe(recipe : Recipe , index : number) {
    const selectRecipe = this.getrecipes()[index];
    selectRecipe.name = recipe.name;
    selectRecipe.imagePath = recipe.imagePath;
    selectRecipe.description = recipe.description;
    selectRecipe.ingredients = recipe.ingredients;
  }
  addnewRecipe(newRecipe: Recipe) {
    newRecipe.Id = String(this.recipes.length + 1) ;
    console.log(newRecipe);
    this.recipes.push(newRecipe);
    this.RecipesUpdated.next(this.recipes);
  }
  deleteRecipe(index) {
    this.recipes.splice(index, 1);
    this.RecipesUpdated.next(this.recipes);
  }
  deleteIngredient( Ingindex: number, recipeIndex: number ) {
    this.recipes[recipeIndex].ingredients.splice( Ingindex , 1);
    this.DeleteIngredient.next( this.recipes[recipeIndex].ingredients);
  }
  addIngToSl(id: number) {
    this.selectedIng = this.getrecipes()[id].ingredients;
    this.store.dispatch(new shoppingListAction.AddIngredients(this.selectedIng));
  }
}

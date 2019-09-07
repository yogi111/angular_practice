import {Ingredients} from "./shared/ingredients.model";
import {EventEmitter} from "@angular/core";

export class ShoppinglistService {
  IngredientUpadated = new EventEmitter<Ingredients[]>();
  public ingredients: Ingredients[] = [
    new Ingredients('apple', 5) ,
    new Ingredients('potatoes', 7) ,
    new Ingredients('tomatoes', 4) ,
    new Ingredients('banana', 8) ,
  ];
  getingredient() {
    return this.ingredients.slice();
  }
  addingredient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    console.log('SL',ingredient);
    this.IngredientUpadated.emit(this.ingredients.slice());
  }
  addingredents(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients);
    this.IngredientUpadated.emit(this.ingredients);
    console.log('event emited');
  }

}


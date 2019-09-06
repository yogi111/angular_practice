import {Ingredients} from "./shared/ingredients.model";
import {EventEmitter} from "@angular/core";
import {log} from "util";

export class ShoppinglistService {
  IngredientUpadated = new EventEmitter<Ingredients[]>();
  IngredientsUpadated = new EventEmitter<Ingredients[]>();
  public ingredients: Ingredients[] = [
    new Ingredients('apple', 5) ,
    new Ingredients('potatoes', 7) ,
    new Ingredients('tomatoes', 4) ,
    new Ingredients('banana', 8) ,
  ];
  getingredient(){
    return this.ingredients.slice();
  }
  addingredient(ingredient: Ingredients){
    this.ingredients.push(ingredient);
    this.IngredientUpadated.emit(this.ingredients.slice());
  }
  addingredents(ingredients: Ingredients[]){
    this.ingredients.push(...ingredients);
    console.log('emitted');
    this.IngredientsUpadated.emit(this.ingredients.slice());
  }

}


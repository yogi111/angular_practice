import {Ingredients} from "./shared/ingredients.model";
import {Subject} from "rxjs";

export class ShoppinglistService {
  IngredientUpadated = new Subject<Ingredients[]>();
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
    this.IngredientUpadated.next(this.ingredients.slice());
  }
  addingredents(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients);
    this.IngredientUpadated.next(this.ingredients.slice());
  }

}


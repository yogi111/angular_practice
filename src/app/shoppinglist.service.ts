import {Ingredients} from "./shared/ingredients.model";
import {ReplaySubject , Subject } from "rxjs";

export class ShoppinglistService {
  private ingredients: Ingredients[] = [
    new Ingredients('apple', 5) ,
    new Ingredients('potatoes', 7) ,
    new Ingredients('tomatoes', 4) ,
    new Ingredients('banana', 8) ,
  ];
  IngredientUpadated = new ReplaySubject<Ingredients[]>(10);
  EditingIng = new Subject< number >();

  getediting (index : number){
    return this.ingredients[index];
  }
  editIng(ing: Ingredients, index: number) {
    console.log(ing, index);
    this.ingredients.splice(index , 1 , ing);
    this.IngredientUpadated.next(this.ingredients.slice());
  }
  deleteing (index: number ) {
    console.log(index);
    this.ingredients.splice(index , 1 );
    this.IngredientUpadated.next(this.ingredients.slice());
  }
  getingredient() {
    return this.ingredients.slice();
  }
  addingredient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    this.IngredientUpadated.next(this.ingredients.slice());
  }
  addingredents(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients);
    this.IngredientUpadated.next(this.ingredients.slice(), );
  }
}


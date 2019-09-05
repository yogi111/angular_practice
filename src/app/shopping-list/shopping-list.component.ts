import { Component, OnInit } from '@angular/core';
import {Ingredients} from "../shared/ingredients.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients: Ingredients[] = [
  new Ingredients('apple', 5) ,
  new Ingredients('potatoes', 7) ,
  new Ingredients('tomatoes', 4) ,
  new Ingredients('banana', 8) ,
]

constructor() { }
  addIngredient(ingrediwnt:Ingredients){
    this.ingredients.push(ingrediwnt);
  }
  ngOnInit() {
  }

}

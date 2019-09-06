import { Component, OnInit } from '@angular/core';
import {Ingredients} from "../shared/ingredients.model";
import {ShoppinglistService} from "../shoppinglist.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ ShoppinglistService ]
})
export class ShoppingListComponent implements OnInit {
private ingredients: Ingredients[] ;
constructor(private shoppinglistservice : ShoppinglistService) { }
  ngOnInit() {
  this.ingredients = this.shoppinglistservice.getingredient();
  this.shoppinglistservice.IngredientsUpadated.subscribe((ingredient: Ingredients[]) => {
      this.ingredients = ingredient;
    });
  this.shoppinglistservice.IngredientUpadated.subscribe((ingredient: Ingredients[]) => {
    this.ingredients = ingredient;
    });
  }

}

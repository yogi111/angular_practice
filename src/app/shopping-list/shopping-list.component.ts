import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredients} from "../shared/ingredients.model";
import {ShoppinglistService} from "../shoppinglist.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ ShoppinglistService ]
})
export class ShoppingListComponent implements OnInit , OnDestroy{
  ingredients: Ingredients[] ;
  subscription: Subscription ;
constructor(private shoppinglistservice : ShoppinglistService) {
}
  ngOnInit() {
    this.ingredients = this.shoppinglistservice.getingredient();
    this.shoppinglistservice.IngredientUpadated.subscribe((ingredient: Ingredients[]) => {
      console.log(this.ingredients);
      this.ingredients = ingredient;
    });
    this.subscription =  this.shoppinglistservice.ingredientsUpdated.subscribe(next => {
      console.log(next);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

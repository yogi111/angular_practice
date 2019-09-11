import {Component, DoCheck, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Ingredients} from "../shared/ingredients.model";
import {ShoppinglistService} from "../shoppinglist.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit , OnDestroy{
  ingredients: Ingredients[] ;
  subscription: Subscription ;
constructor(private shoppinglistservice : ShoppinglistService) {
  console.log('ng constructor called');
}
  ngOnInit() {
    this.ingredients = this.shoppinglistservice.getingredient();
    this.subscription = this.shoppinglistservice.IngredientUpadated.subscribe((ingredient: Ingredients[]) => {
      this.ingredients = ingredient;
      });
  }
  editIng(index: number){
    this.shoppinglistservice.EditingIng.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

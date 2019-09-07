import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Ingredients} from "../shared/ingredients.model";
import {ShoppinglistService} from "../shoppinglist.service";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ ShoppinglistService ]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredients[] ;
constructor(private shoppinglistservice : ShoppinglistService) { }
  ngOnInit() {
    console.log('on view init');
    this.ingredients = this.shoppinglistservice.getingredient();
    this.shoppinglistservice.IngredientUpadated.subscribe((ingredient: Ingredients[]) => {
      this.ingredients = ingredient;
      console.log('sub called');
    });
  }
}

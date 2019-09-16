import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredients} from '../shared/ingredients.model';
import {ShoppinglistService} from '../shoppinglist.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit , OnDestroy{
  ingredients: Observable<{ingredients: Ingredients[]}>;
constructor(private shoppinglistservice: ShoppinglistService, private store: Store<{shoppinglist: { ingredients: [] } }>) { }
  ngOnInit() {
  this.ingredients = this.store.select('shoppinglist');
  }
  editIng(index: number){
    this.shoppinglistservice.EditingIng.next(index);
  }
  ngOnDestroy() {
  }
}

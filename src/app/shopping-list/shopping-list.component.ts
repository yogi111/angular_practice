import {Component, OnDestroy, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shopinglistReducer from './STORE/shopping-list.reducer';
import * as shopinglistAction from './STORE/shopping-list.action';

import { Ingredients } from '../shared/ingredients.model';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit , OnDestroy {
  ingredients: Observable<{ ingredients: Ingredients[] }>;
constructor( private store: Store<shopinglistReducer.State>) { }
  ngOnInit() {
  this.ingredients = this.store.select('shoppinglist');
  }
  editIng(index: number) {
    this.store.dispatch(new shopinglistAction.StartEdit(index));
}
  ngOnDestroy() {
  }
}

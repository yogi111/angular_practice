import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Ingredients} from '../../shared/ingredients.model';
import {NgForm} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as shoppingListAction from '../STORE/shopping-list.action';
import * as shoppingListreducer from '../STORE/shopping-list.reducer';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private store: Store<shoppingListreducer.State>) { }
  @ViewChild( 'f' , { static: false}) SLform: NgForm ;
      editMode =  false ;
      ingredient: Ingredients;
      subscription: Subscription;

  onAdd( form: NgForm) {
    const value = form.value;
    if ( this.editMode === true ) {
      const editedIng  = new Ingredients( value.name , value.amount);
      console.log(editedIng);
      this.store.dispatch(new shoppingListAction.UpdateIngredient(editedIng))
      this.editMode = false;
      form.reset();
    } else {
      const  newIngredient = new Ingredients(value.name , value.amount );
      this.store.dispatch(new shoppingListAction.AddIngredient(newIngredient));
      form.reset();
    }
  }
  onreset(form: NgForm) {
    form.reset();
    this.editMode = false;
    this.store.dispatch(new shoppingListAction.EndEdit());
  }
  ondelete(form: NgForm ) {
    const value = form.value;
    if ( this.editMode == true ) {
      const DeleteIng = new Ingredients(value.name, value.amount);
      this.store.dispatch(new shoppingListAction.DeleteIngredient());
      this.editMode = false;
      alert( DeleteIng.name + ' is deleted !' );
      form.reset();
    }
  }
  ngOnInit() {
        this.subscription = this.store.select('shoppinglist').subscribe(stateData => {
          console.log(stateData);
          if (stateData.editedIngredientIndex > -1) {
            this.editMode = true;
            this.ingredient = stateData.editedIngredient;
            this.SLform.setValue(
                {
                  name: this.ingredient.name,
                  amount: this.ingredient.amount
                });
          } else {
            this.editMode = false;
          }
        });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new shoppingListAction.EndEdit());
  }
}

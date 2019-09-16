import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingredients} from '../../shared/ingredients.model';
import {ShoppinglistService} from '../../shoppinglist.service';
import {NgForm} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as shoppingListAction from '../STORE/shopping-list.action';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppinglistservice: ShoppinglistService,  private store: Store<{shoppinglist: { ingredients: [] } }>) { }
  @ViewChild( 'f' , { static: false}) SLform: NgForm ;
      editMode =  false ;
      editItemIndex: number ;
      ingredient: Ingredients

  onAdd( form: NgForm) {
    const value = form.value;
    if ( this.editMode === true ) {
      const editedIng  = new Ingredients( value.name , value.amount);
      this.store.dispatch(new shoppingListAction.UpdateIngredient({
        index: this.editItemIndex,
        ingredient: editedIng
      }))
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
  }
  ondelete(form: NgForm ) {
    const value = form.value;
    const deleteInedex = this.editItemIndex;
    if ( this.editMode == true ) {
      const DeleteIng = new Ingredients(value.name, value.amount);
      this.store.dispatch(new shoppingListAction.DeleteIngredient(deleteInedex));
      this.editMode = false;
      alert( DeleteIng.name + ' is deleted !' );
      form.reset();
    }
  }
  ngOnInit() {
    this.shoppinglistservice.EditingIng.subscribe(index => {
      this.editMode = true;
      this.editItemIndex = index;
      console.log(this.SLform);
      this.store.select('shoppinglist').subscribe(Ingredients => {
        this.ingredient =  Ingredients.ingredients[this.editItemIndex];
      })
      this.SLform.setValue(
        {
          name: this.ingredient.name,
          amount: this.ingredient.amount
        });
    });
  }
}

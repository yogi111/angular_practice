import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingredients} from '../../shared/ingredients.model';
import {ShoppinglistService} from '../../shoppinglist.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppinglistservice: ShoppinglistService) { }
  @ViewChild( 'f' , { static: false}) SLform: NgForm ;
      editMode =  false ;
      editItemIndex: number ;
      editItem: Ingredients ;

  onAdd( form: NgForm) {
    const value = form.value;
    if( this.editMode == true ) {
      const editedIng  = new Ingredients( value.name , value.amount);
      this.shoppinglistservice.editIng(editedIng , this.editItemIndex);
      this.editMode = false;
      form.reset();
    } else {
      const  newIngredient = new Ingredients(value.name , value.amount );
      this.shoppinglistservice.addingredient(newIngredient);
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
      console.log(value.name, value.amount);
      const DeleteIng = new Ingredients(value.name, value.amount);
      this.shoppinglistservice.deleteing(deleteInedex);
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
      this.editItem = this.shoppinglistservice.getediting(index);
      this.SLform.setValue(
        {
          name: this.editItem.name,
          amount: this.editItem.amount
        });
    });
  }

}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredients} from "../../shared/ingredients.model";
import {ShoppinglistService} from "../../shoppinglist.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('IngredientName', {static: true}) Name: ElementRef ;
  @ViewChild('IngredientAmount', {static: true}) Amount: ElementRef ;

  constructor(private shoppinglistservice: ShoppinglistService){ }
  onAdd(){
    const ingName = this.Name.nativeElement.value;
    const ingAmount = this.Amount.nativeElement.value
    const  newIngredient = new Ingredients(ingName , ingAmount );
    this.shoppinglistservice.addingredient(newIngredient);

  }
  ngOnInit() {
  }

}

import {Component, ElementRef, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {Ingredients} from "../../shared/ingredients.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('IngredientName', {static: true}) Name: ElementRef ;
  @ViewChild('IngredientAmount', {static: true}) Amount: ElementRef ;
  @Output() AddIngredient = new EventEmitter<Ingredients>();

  constructor() { }
  onAdd(){
    const  newIngredient = new Ingredients( this.Name.nativeElement.value, this.Amount.nativeElement.value);
    this.AddIngredient.emit(newIngredient);
  }
  ngOnInit() {
  }

}

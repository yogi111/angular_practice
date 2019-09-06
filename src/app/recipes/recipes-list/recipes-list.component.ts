import {Component, OnInit, Output, EventEmitter } from '@angular/core';
import  { Recipe} from "../recipe.model";
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private  recipeservice: RecipeService) { }
  ngOnInit() {
  this.recipes =  this.recipeservice.getrecipes();
  }
}

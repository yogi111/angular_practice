import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css'],
})
export class RecipesDetailComponent implements OnInit {
  @Input() selectedRecipe:Recipe;
  constructor(private recipeservice: RecipeService) { }

  ngOnInit() {
    this.recipeservice.selectrecipe.subscribe(this.selectedRecipe);
  }
  AddtoSL(){
    this.recipeservice.addIngToSl(this.selectedRecipe.ingredients);
  }
}

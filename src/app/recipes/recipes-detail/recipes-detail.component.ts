import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../../recipe.service";
import {Ingredients} from "../../shared/ingredients.model";
import {ActivatedRoute, Params} from "@angular/router";
import {__values} from "tslib";
import {log} from "util";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css'],
})
export class RecipesDetailComponent implements OnInit {
  selectedRecipe: Recipe ;
  id : string;
  constructor(private recipeservice: RecipeService, private raout: ActivatedRoute ) { }

  ngOnInit() {
    this.raout.params.
    subscribe((params: Params) => {
      this.selectedRecipe = this.recipeservice.getrecipes()
        [Number(this.raout.snapshot.params.id ) - 1];
    });
  }
  AddtoSL() {
    this.recipeservice.addIngToSl((Number ( this.raout.snapshot.params.id ) - 1));
  }
}

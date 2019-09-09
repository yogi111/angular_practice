import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css'],
})
export class RecipesDetailComponent implements OnInit {
  selectedRecipe: Recipe ;
  constructor(private recipeservice: RecipeService, private raout: ActivatedRoute,
              private  router: Router) { }

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
  editrecipe(){
    this.router.navigate(['edit'], {relativeTo: this.raout} );
  }
}

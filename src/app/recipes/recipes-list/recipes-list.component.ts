import {Component, OnInit} from '@angular/core';
import { Recipe} from "../recipe.model";
import {RecipeService} from "../../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private  recipeservice: RecipeService,
              private router: Router ,
              private rout: ActivatedRoute) { }
  ngOnInit() {
  this.recipes =  this.recipeservice.getrecipes();
  this.recipeservice.RecipesUpdated.asObservable().subscribe(( recipes: Recipe[]) => {
    this.recipes = recipes;
  });
  this.recipeservice.RecipeFetched.asObservable().subscribe(( recipes: Recipe[]) => {
      this.recipes = recipes;
      console.log(recipes);
    });
  }
  navigateto() {
    this.router.navigate(['new'], { relativeTo: this.rout} );
  }
}

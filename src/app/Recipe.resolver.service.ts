import {Injectable} from "@angular/core";
import {DatastoringService} from "./datastoring.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router'
import {Recipe} from "./recipes/recipe.model";
import {RecipeService} from "./recipe.service";

@Injectable({providedIn: "root"})
export  class RecipeResolverService implements Resolve<Recipe[]>{
  constructor(private datastoringservice: DatastoringService, private RecipeService: RecipeService) { }
  resolve(route: ActivatedRouteSnapshot , state: RouterStateSnapshot ) {
    const recipes = this.RecipeService.getrecipes();
    if (recipes.length === 0) {
      return  this.datastoringservice.FetchRecipes();
    } else {
      return recipes;
    }
  }
}

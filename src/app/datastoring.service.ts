import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "./recipe.service";
import {Recipe} from "./recipes/recipe.model";
import {map, tap} from "rxjs/operators";

@Injectable({providedIn: "root" })

export  class  DatastoringService  {
  constructor(private http: HttpClient, private RecipeService: RecipeService) { }

  storingRecipe() {
    const  recipes =  this.RecipeService.getrecipes();
    this.http.put('https://angular-course-project-5c4e3.firebaseio.com/recipe.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  FetchRecipes() {
    return this.http
      .get<Recipe[]>('https://angular-course-project-5c4e3.firebaseio.com/recipe.json')
      .pipe(map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
      }),
        tap(recipes => {
          this.RecipeService.Loadrecipes( recipes );
        })
      );
  }
}

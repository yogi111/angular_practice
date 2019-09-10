import {Recipe} from "./recipes/recipe.model";
import { Injectable } from "@angular/core";
import {Ingredients} from "./shared/ingredients.model";
import {ShoppinglistService} from "./shoppinglist.service";
import {Subject} from "rxjs";
@Injectable()
export class RecipeService {
  DeleteIngredient = new Subject<Ingredients[]>();
  RecipesUpdated =  new Subject<Recipe[]>();
  selectedIng: Ingredients[];
  private recipes: Recipe[] = [
    new Recipe
    (
      '1',
      'test1 Recipe',
      'test 1',
      'https://asset.slimmingworld.co.uk/content/media/11596/jackfruit-chilli-iceland_sw_recipe.jpg?v1=JGXiore20qg9NNIj0tmc3TKfKw-jr0s127JqqpCA2x7sMviNgcAYh1epuS_Lqxebn9V_qusKHfwbF7MOUrAPptzBhXIUL1Xnq2Mmdvx4fOk&width=640&height=640'
      ,[
        new Ingredients('xyz', 22),
        new Ingredients('xyz', 22),
        new Ingredients('xyz', 22)
      ]
)
    ,
    new Recipe(
      '2',
      'test2 Recipe',
      'test 2',
  'https://asset.slimmingworld.co.uk/content/media/11596/jackfruit-chilli-iceland_sw_recipe.jpg?v1=JGXiore20qg9NNIj0tmc3TKfKw-jr0s127JqqpCA2x7sMviNgcAYh1epuS_Lqxebn9V_qusKHfwbF7MOUrAPptzBhXIUL1Xnq2Mmdvx4fOk&width=640&height=640'
      , [
      new Ingredients('xyz', 22),
      new Ingredients('xyz', 22),
      new Ingredients('xyz', 22),
      ]
    )
    ,
    new Recipe(
      '3',
      'test3 Recipe',
      'test 3',
      'https://asset.slimmingworld.co.uk/content/media/11596/jackfruit-chilli-iceland_sw_recipe.jpg?v1=JGXiore20qg9NNIj0tmc3TKfKw-jr0s127JqqpCA2x7sMviNgcAYh1epuS_Lqxebn9V_qusKHfwbF7MOUrAPptzBhXIUL1Xnq2Mmdvx4fOk&width=640&height=640'
        ,[
          new Ingredients('xyz', 22),
          new Ingredients('xyz', 22),
          new Ingredients('xyz', 22)
        ]
    )
  ];
  getrecipes() {
    return this.recipes.slice();
  }
  constructor(private SLservice: ShoppinglistService) {
  }
  updaterecipe(recipe : Recipe , index : number) {
    const selectRecipe = this.getrecipes()[index];
    selectRecipe.name = recipe.name;
    selectRecipe.imagePath = recipe.imagepath;
    selectRecipe.description = recipe.description;
    selectRecipe.ingredients = recipe.ingredients;
  }
  addnewRecipe(newRecipe: Recipe){
    newRecipe.Id = String(this.recipes.length + 1) ;
    console.log(newRecipe);
    this.recipes.push(newRecipe);
    this.RecipesUpdated.next(this.recipes);
  }
  deleteRecipe(index){
    this.getrecipes().splice(index, 1);
    this.RecipesUpdated.next(this.recipes);
  }
  deleteIngredient( Ingindex: number, recipeIndex: number ) {
    this.recipes[recipeIndex].ingredients.splice( Ingindex , 1);
    this.DeleteIngredient.next( this.recipes[recipeIndex].ingredients);
  }
  addIngToSl(id: number) {
    this.selectedIng = this.getrecipes()[id].ingredients;
    this.SLservice.addingredents(this.selectedIng);
  }
}

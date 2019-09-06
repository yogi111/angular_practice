import {Recipe} from "./recipes/recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredients} from "./shared/ingredients.model";
import {ShoppinglistService} from "./shoppinglist.service";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe
    (
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
      'test3 Recipe',
      'test 3',
      'https://asset.slimmingworld.co.uk/content/media/11596/jackfruit-chilli-iceland_sw_recipe.jpg?v1=JGXiore20qg9NNIj0tmc3TKfKw-jr0s127JqqpCA2x7sMviNgcAYh1epuS_Lqxebn9V_qusKHfwbF7MOUrAPptzBhXIUL1Xnq2Mmdvx4fOk&width=640&height=640'
        ,[
          new Ingredients('xyz', 22),
          new Ingredients('xyz', 22),
          new Ingredients('xyz', 22)
        ]
    )
  ]
  getrecipes(){
    return this.recipes.slice();
  }
  constructor(private SLservice: ShoppinglistService){};
  selectrecipe = new EventEmitter<Recipe>();

  addIngToSl( ing: Ingredients[]){
    this.SLservice.addingredents(ing);
  }
}

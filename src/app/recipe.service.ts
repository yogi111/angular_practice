import {Recipe} from "./recipes/recipe.model";
import { Injectable } from "@angular/core";
import {Ingredients} from "./shared/ingredients.model";
import {ShoppinglistService} from "./shoppinglist.service";
@Injectable()
export class RecipeService {
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

  addIngToSl(id: number) {
    this.selectedIng = this.getrecipes()[id].ingredients;
    this.SLservice.addingredents(this.selectedIng);
  }
}

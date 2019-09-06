import {Ingredients} from "../shared/ingredients.model";

export  class  Recipe {
  public name:string;
  public  description:string;
  public  imagePath:string;
  public  ingredients:Ingredients[];

  constructor(name:string,desc:string,imagePath:string , inggredients:Ingredients[]){
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = inggredients;
  }
}

import {Ingredients} from "../shared/ingredients.model";

export  class  Recipe {
  public  Id : string;
  public name:string;
  public  description:string;
  public  imagePath:string;
  public  ingredients:Ingredients[];

  constructor(id : string, name: string, desc: string, imagePath: string , inggredients : Ingredients[]) {
    this.Id = id ;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = inggredients;
  }
}

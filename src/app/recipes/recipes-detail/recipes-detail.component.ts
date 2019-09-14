import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ShoppinglistService} from "../../shoppinglist.service";


@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css'],
})
export class RecipesDetailComponent implements OnInit {
  show = false;
  selectedRecipe: Recipe ;
  Id = Number(this.raout.snapshot.params.id) - 1;

  constructor(private recipeservice: RecipeService, private raout: ActivatedRoute,
              private  router: Router, private shoppingservice: ShoppinglistService) { }
  ngOnInit() {
    this.raout.params.
    subscribe((params: Params) => {
      this.selectedRecipe = this.recipeservice.getrecipes()[this.raout.snapshot.params.id];
    });
  }
  Toggle(){
    this.show = !this.show;
  }
  DeleteRecipe() {
    this.recipeservice.deleteRecipe(this.Id);
    this.router.navigate(['../'] , {relativeTo: this.raout});
  }
  AddtoSL() {
    this.recipeservice.addIngToSl((Number ( this.raout.snapshot.params.id )));
    this.router.navigate(['shopping-list']);
  }
  editrecipe(){
    this.router.navigate(['edit'], {relativeTo: this.raout} );
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {RecipeService} from '../../recipe.service';
import {Subscription} from 'rxjs';
import {Ingredients} from '../../shared/ingredients.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  index: number;
  editmode = false;
  recipeForm: FormGroup;
  IngredentUpdate: Subscription;
  constructor(private router: Router, private rout: ActivatedRoute, private recipeservice: RecipeService) {
  }

  ngOnInit() {
    this.rout.params
      .subscribe((params: Params) => {
        this.index = params['id'];
        this.editmode = params['id'] != null;
        this.initform();
      });
      this.initform();
      this.IngredentUpdate = this.recipeservice.DeleteIngredient.subscribe((ingredients: Ingredients[]) => {
      this.recipeForm.value.ingtredients = ingredients;
    })
  }

  private initform() {
    let recipename = '';
    let recipeimage = '';
    let description = '';
    let ingredients = new FormArray([]);
    if (this.editmode) {
      const recipe = this.recipeservice.getrecipes()[this.index] ;
      recipename = recipe.name;
      recipeimage = recipe.imagePath;
      description = recipe.description;
      for (let ingredient of recipe.ingredients)
        {
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount , Validators.required)
            })
          );
        }
      this.recipeForm = new FormGroup({
        'name': new FormControl(recipename, Validators.required),
        'imagePath': new FormControl(recipeimage, Validators.required),
        'description': new FormControl(description, Validators.required),
        'ingredients': ingredients
      });
    }else{
      this.recipeForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'imagePath': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required),
        'ingredients': new FormArray([
          new FormGroup({
            'name': new FormControl(null, Validators.required),
            'amount': new FormControl(null, Validators.required )
          })
        ])
      })
      ;
    }
  }

  onsubmit(recipeForm: FormGroup) {
    if(this.editmode){
      this.recipeservice.updaterecipe( recipeForm.value , this.index );
      this.router.navigate(['recipe']);
    } else {
     this.recipeservice.addnewRecipe(recipeForm.value);
      this.router.navigate(['recipe']);
    }
  }
  deleteIng(index: number) {
    if (this.editmode) {
      this.recipeservice.deleteIngredient(index, this.index);
      const  frmary =  this.recipeForm.get('ingredients') as FormArray ;
      frmary.removeAt(index);
    } else {
      const  frmary =  this.recipeForm.get('ingredients') as FormArray ;
      frmary.removeAt(index);
    }
    }
  addingField() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null , Validators.required)
    }));
  }
  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
  cancle() {
    this.router.navigate(['../'], {relativeTo: this.rout});
  }
}

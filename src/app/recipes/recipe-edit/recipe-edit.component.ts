import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../recipe.service';
import { Subscription } from 'rxjs';
import { Ingredients } from '../../shared/ingredients.model';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../Store/app.reducer';
import { Recipe } from '../recipe.model';
import * as recipeactions from '../store/recipe.action';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    index: number;
    editmode = false;
    editrecipe: Recipe = null;
    recipeForm: FormGroup;

    constructor(private router: Router,
                private rout: ActivatedRoute,
                private  store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
        this.rout.params.pipe(map(Response => {
                return Response.id;
            }),
            switchMap(id => {
                this.index = id;
                return this.store.select('recipes');
            }),
            map((respData => {
                return respData.recipes;
            }))
        ).subscribe((recipes) => {
            this.editmode = recipes[this.index] != null;
            this.editrecipe = recipes[this.index];
        });
        this.initform();
    }

    private initform() {
        let recipename = '';
        let recipeimage = '';
        let description = '';
        const ingredients = new FormArray([]);
        if (this.editmode) {
            const recipe = this.editrecipe;
            recipename = recipe.name;
            recipeimage = recipe.imagePath;
            description = recipe.description;
            for (const ingredient of recipe.ingredients) {
                ingredients.push(
                    new FormGroup({
                        name: new FormControl(ingredient.name, Validators.required),
                        amount: new FormControl(ingredient.amount, Validators.required)
                    })
                );
            }
            this.recipeForm = new FormGroup({
                name: new FormControl(recipename, Validators.required),
                imagePath: new FormControl(recipeimage, Validators.required),
                description: new FormControl(description, Validators.required),
                ingredients
            });
        } else {
            this.recipeForm = new FormGroup({
                name: new FormControl(null, Validators.required),
                imagePath: new FormControl(null, Validators.required),
                description: new FormControl(null, Validators.required),
                ingredients: new FormArray([
                    new FormGroup({
                        name: new FormControl(null, Validators.required),
                        amount: new FormControl(null, Validators.required)
                    })
                ])
            })
            ;
        }
    }

    onsubmit(recipeForm: FormGroup) {
        if (this.editmode) {
            this.store.dispatch(new recipeactions.UpdateRecipe({ updateRecipe: recipeForm.value, index: this.index }));
            this.router.navigate(['recipe']);
        } else {
            this.store.dispatch(new recipeactions.AddRecipe(recipeForm.value));
            // this.recipeservice.addnewRecipe(recipeForm.value);
            this.router.navigate(['recipe']);
        }
    }

    deleteIng(index: number) {
        if (this.editmode) {
            this.store.dispatch( new recipeactions.DeleteIngredient({Rindex: this.index, Iindex: index}));
            const frmary = this.recipeForm.get('ingredients') as FormArray;
            if (frmary.length > 1 ) {
                frmary.removeAt(index);
            } else {
                alert('0 ingredient not allowed');
            }
        } else {
            const frmary = this.recipeForm.get('ingredients') as FormArray;
            if (frmary.length > 1 ) {
                frmary.removeAt(index);
            } else {
                alert('0 ingredient not allowed');
            }
        }
    }

    addingField() {
        (<FormArray> this.recipeForm.get('ingredients')).push(new FormGroup({
            name: new FormControl(null, Validators.required),
            amount: new FormControl(null, Validators.required)
        }));
    }

    get controls() {
        return (this.recipeForm.get('ingredients') as FormArray).controls;
    }

    cancle() {
        this.router.navigate(['../'], { relativeTo: this.rout });
    }
}

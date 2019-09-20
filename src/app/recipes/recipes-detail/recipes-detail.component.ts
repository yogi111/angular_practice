import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../../recipe.service';
import {ActivatedRoute,  Router} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../Store/app.reducer';
import * as recipeAction from '../store/recipe.action';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css'],
})
export class RecipesDetailComponent implements OnInit {
  selectedRecipe: Recipe ;
  Id = null;
  constructor(private recipeservice: RecipeService,
              private raout: ActivatedRoute,
              private  router: Router,
              private store: Store<fromApp.AppState>
  ) { }
  ngOnInit() {
    this.raout.params.
        pipe(map( params => {
          return +params.id;
      }), switchMap( id => {
        this.Id = id;
        return  this.store.select('recipes');
      }),
        map(respData => {
          return respData.recipes;
        })).subscribe((recipes) => {
          this.selectedRecipe = recipes[this.Id];
    });
  }

  DeleteRecipe() {
    this.store.dispatch(new recipeAction.DeleteRecipe(this.Id));
    this.router.navigate(['../'] , {relativeTo: this.raout});
  }
  AddtoSL() {
    this.recipeservice.addIngToSl();
    this.router.navigate(['shopping-list']);
  }
  editrecipe() {
    this.router.navigate(['edit'], {relativeTo: this.raout} );
  }
}

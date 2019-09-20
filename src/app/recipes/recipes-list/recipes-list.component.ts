import { Component, Input, OnInit } from '@angular/core';
import { Recipe} from '../recipe.model';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import * as FromApp from '../../Store/app.reducer';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  @Input() recipes: Recipe[];

  constructor(private router: Router,
              private rout: ActivatedRoute,
              private store: Store<FromApp.AppState> ) { }
  ngOnInit() {
  this.store.select('recipes')
      .pipe(
          map(resp => {
            return resp.recipes;
          } )
      )
      .subscribe(( recipes: Recipe[]) => {
    this.recipes = recipes;

    console.log(this.recipes);
  });
  }
  navigateto() {
    this.router.navigate(['new'], { relativeTo: this.rout} );
  }
}

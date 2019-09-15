import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {RecipesComponent} from './recipes.component';
import {AuthGard} from '../auth/auth/auth.gard';
import {RecipeStatrtComponent} from './recipe-statrt/recipe-statrt.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipesDetailComponent} from './recipes-detail/recipes-detail.component';
import {RecipeResolverService} from '../Recipe.resolver.service';

const addroot: Route[] = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGard]
    , children : [
      {
        path: '',
        component: RecipeStatrtComponent,
        pathMatch: 'full'
      },
      {
        path: 'new',
        component: RecipeEditComponent
      },
      {
        path: ':id',
        component: RecipesDetailComponent,
        resolve: [RecipeResolverService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(addroot)],
  exports: [RouterModule]
})
export class RecipeRoutingModule {
}

import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {RecipesDetailComponent} from "./recipes/recipes-detail/recipes-detail.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeStatrtComponent} from "./recipes/recipe-statrt/recipe-statrt.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipeResolverService} from "./Recipe.resolver.service";
const addrout: Route[] = [
  {
    path: ' ' ,
    redirectTo: '/recipe',
    pathMatch: 'full'
  },
  {
    path: 'recipe',
    component: RecipesComponent
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
      },
    ]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(addrout)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

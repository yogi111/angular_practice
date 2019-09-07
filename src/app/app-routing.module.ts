import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {RecipesDetailComponent} from "./recipes/recipes-detail/recipes-detail.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeStatrtComponent} from "./recipes/recipe-statrt/recipe-statrt.component";
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
        path: ':id',
        component: RecipesDetailComponent
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

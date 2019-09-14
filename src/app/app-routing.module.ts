import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";

const addrout: Route[] = [
  {
    path: '',
    redirectTo: '/recipe',
    pathMatch: 'full'
  },
  {
    path: 'recipe',
    loadChildren: './recipes/recipe.module#RecipeModule',

  }
];
@NgModule({
  imports: [RouterModule.forRoot(addrout)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

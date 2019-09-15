import {NgModule} from '@angular/core';
import {PreloadAllModules, Route, RouterModule} from '@angular/router';

const addrout: Route[] = [
  {
    path: '',
    redirectTo: '/recipe',
    pathMatch: 'full'
  },
  {
    path: 'recipe',
    loadChildren: './recipes/recipe.module#RecipeModule',

  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',

  },
  {
    path: 'shopping-list',
    loadChildren: './shopping-list/shopping.module#ShoppingModule',

  }
];
@NgModule({
  imports: [RouterModule.forRoot(addrout , {preloadingStrategy : PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

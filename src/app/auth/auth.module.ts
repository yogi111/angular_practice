import {NgModule} from '@angular/core';
import {AuthComponent} from './auth/auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RecipeGard} from '../recipes/recipe.gard';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{
      path: '',
      component: AuthComponent,
      canActivate: [RecipeGard]
    }])
    ],
  exports: [
    AuthComponent,
  ]
})

export class AuthModule {
}

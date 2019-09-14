import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import {ShoppinglistService} from './shoppinglist.service';
import {AppRoutingModule} from './app-routing.module';
import {RecipeService} from './recipe.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from './auth/auth/auth-interceptor.service';
import {AlertComponent} from './shared/alert/alert.component';
import {RecipeRoutingModule} from './recipes/recipe.routing.module';
import {ShoppingModule} from './shopping-list/shopping.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RecipeRoutingModule,
    ShoppingModule,
    AuthModule,
    SharedModule,
  ],
  providers: [ShoppinglistService, RecipeService , {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule { }

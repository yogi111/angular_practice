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
import {SharedModule} from './shared/shared.module';
import {CoreModule} from "./core.module";
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/STORE/shopping-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({shoppinglist: shoppingListReducer}),
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule { }

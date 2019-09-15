import {ShoppinglistService} from "./shoppinglist.service";
import {RecipeService} from "./recipe.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth/auth-interceptor.service";
import {NgModule} from "@angular/core";

@NgModule({
  providers: [
    ShoppinglistService,
    RecipeService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
    }
    ]
})
export  class CoreModule { }

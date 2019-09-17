import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import {AlertComponent} from './shared/alert/alert.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core.module';
import { StoreModule } from '@ngrx/store';
import * as fromrApp from './Store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromrApp.appReducer),
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule { }

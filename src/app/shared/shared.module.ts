import {NgModule} from '@angular/core';
import {LoaddingComponent} from './loading/loadingComponent/loadding.component';
import {PlaceholderDirective} from './placeholder/placeholder.directive';
import {AlertComponent} from './alert/alert.component';
import {DropdownDirective} from './dropdown.directive';
import {CommonModule} from '@angular/common';

@NgModule({
declarations: [
  LoaddingComponent,
  PlaceholderDirective,
  AlertComponent,
  DropdownDirective,
],
  imports: [
    CommonModule
  ],
  exports: [
    LoaddingComponent,
    PlaceholderDirective,
    AlertComponent,
    DropdownDirective,
    CommonModule
  ]
})
export  class SharedModule {

}

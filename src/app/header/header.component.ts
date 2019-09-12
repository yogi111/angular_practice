import {Component, Output , EventEmitter} from '@angular/core';
import {DatastoringService} from "../datastoring.service";
import {subscribeOn} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
@Output() featureSelected = new EventEmitter<string>();
  collapsed = false;
constructor(private DataStoringService: DatastoringService){

}
  savedata() {
  this.DataStoringService.storingRecipe();
  }

  fetchdata() {
  this.DataStoringService.FetchRecipes().subscribe();
  }
}

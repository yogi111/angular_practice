import {Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {DatastoringService} from "../datastoring.service";
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
@Output() featureSelected = new EventEmitter<string>();
  collapsed = false;
  UserSub: Subscription;
  IsAuthenticated = false;

constructor(private DataStoringService: DatastoringService, private Authservice: AuthService) { }
  ngOnInit() {
  this.UserSub =  this.Authservice.user.subscribe((user) => {
    this.IsAuthenticated = !!user;
    console.log(!!user);
    console.log(!user);
  });
}
  savedata() {
  this.DataStoringService.storingRecipe();
  }

  fetchdata() {
  this.DataStoringService.FetchRecipes().subscribe();
  }

  onLogout(){
  this.Authservice.logout();
  }
ngOnDestroy(){
  this.UserSub.unsubscribe();
}
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth/auth/auth.service';
import {DatastoringService} from "./datastoring.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
UserSub:Subscription;
IsAuthenticated = false;

  constructor(private authservice: AuthService, private dtastoringservice: DatastoringService) { }
  ngOnInit() {
  this.authservice.autoLogin();
  this.UserSub =  this.authservice.user.subscribe((user) => {
      this.IsAuthenticated = !!user;
    });
    if (this.IsAuthenticated) {
      this.dtastoringservice.FetchRecipes().subscribe();
    }
  }
  ngOnDestroy() {
  this.UserSub.unsubscribe();
  }
}

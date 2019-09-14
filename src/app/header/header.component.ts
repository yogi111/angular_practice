import {Component, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {DatastoringService} from "../datastoring.service";
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth/auth.service";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

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
  AlertSub: Subscription;
  @ViewChild(PlaceholderDirective , {static: false }) alertHost: PlaceholderDirective;


  constructor(private DataStoringService: DatastoringService, private Authservice: AuthService,  private cmpFtry: ComponentFactoryResolver) { }
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
  this.DataStoringService.FetchRecipes().subscribe(res => {
    if(res == null){
      this.Createalert('Oops! there is no Recipes');
    }
  });
  }

  onLogout() {
  this.Authservice.logout();
  }
  Createalert(message: string) {

    const alertcmpFtry = this.cmpFtry.resolveComponentFactory(AlertComponent);

    const HostRef = this.alertHost.viewcontainerref;
    HostRef.clear();

    const alertcmpref = HostRef.createComponent(alertcmpFtry);

    alertcmpref.instance.message = message;
    this.AlertSub = alertcmpref.instance.close.subscribe(() => {
      this.AlertSub.unsubscribe();
      HostRef.clear();
    });
  }
ngOnDestroy(){
  this.UserSub.unsubscribe();
}
}

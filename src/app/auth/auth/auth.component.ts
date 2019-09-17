import {Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService, Authresponce} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertComponent} from '../../shared/alert/alert.component';
import {PlaceholderDirective} from '../../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
loginmode = false;
loading = false;
error: string = null;
authObs: Observable<Authresponce>;
AlertSub: Subscription;
@ViewChild(PlaceholderDirective , {static: false }) alertHost: PlaceholderDirective;

  constructor( private Authservice: AuthService, private router: Router, private cmpFtry: ComponentFactoryResolver) { }

  authanticate(Auth: NgForm) {
    if ( !Auth.value) {
      return;
    } else {
      const email = Auth.value.email;
      const password = Auth.value.password;
      this.loading = true;
      if (this.loginmode) {
        this.authObs = this.Authservice.signIn(email, password);
      } else {
        this.authObs = this.Authservice.signup(email, password);
      }
      this.authObs.subscribe(response => {
        this.loading = false;
        this.error = null;
        this.router.navigate(['/recipe']);
        console.log(response);
      }, errorRes => {
        this.loading = false;
        this.error = errorRes;
        this.CretateAlert(errorRes);
      });
    }
    Auth.reset();
  }
  switchmode() {
  this.loginmode = !this.loginmode;
  }
  CretateAlert(message: string) {

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
  ngOnInit() {
  }
}

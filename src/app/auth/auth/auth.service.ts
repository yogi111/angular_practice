import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, ReplaySubject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface Authresponce {
  idToken: string ;
  email: string ;
  refreshToken: string ;
  expiresIn: string ;
  localId: string ;
  registered?: boolean
}
@Injectable({providedIn : 'root'})
export class AuthService {
  user =  new BehaviorSubject<User>(null);
  logouttimer: any;
  constructor(private http: HttpClient , private router: Router) { }

  autoLogin(){
    const userdata:{
      email: string,
      Id: string,
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userdata'));
    if (!userdata) {
    return;
    }
    const LoadUser = new User(userdata.email, userdata.Id , userdata._token , new Date(userdata._tokenExpirationDate));
    if (LoadUser.token) {
      this.user.next(LoadUser);
      const expireRemain =  new Date(userdata._tokenExpirationDate).getTime() - new Date().getTime() ;
      this.autoLogout(expireRemain);
    }
  }
  signup(email: string, password: string) {
      return this.http.post<Authresponce>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfdhw3aRT0eCqfXIPQm2eMcmQ6-kp4TwM'
      , {
          'email' : email,
          'password': password,
          'returnSecureToken' : true
        }).pipe(catchError ( this.ErrorHandler ), tap(resData => {
        this.handleAuthantication( resData.email, resData.localId, resData.idToken, +resData.expiresIn );
      }));
  }
  signIn(email: string, password: string) {
    return this.http.post<Authresponce>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfdhw3aRT0eCqfXIPQm2eMcmQ6-kp4TwM',
      {
        'email' : email,
        'password': password,
        'returnSecureToken' : true
      }).pipe(catchError ( this.ErrorHandler)
    , tap(resData => {
        this.handleAuthantication( resData.email, resData.localId, resData.idToken, +resData.expiresIn );
      }));
  }
  logout() {
    this.user.next(null);
    localStorage.clear();
    this.router.navigate(['/auth']);
    if (this.logouttimer) {
      clearInterval(this.logouttimer);
    }
    this.logouttimer = null;
  }
  autoLogout( authExpirationtime: number) {
    console.log(authExpirationtime);
    this.logouttimer = setInterval(() => {
      this.logout();
    }, authExpirationtime);
  }
  private  ErrorHandler(errorResponse: HttpResponse ) {
    let ErrorMessage = 'Unknowen Error Occurred !!';
    if (!errorResponse.error || !errorResponse.error.error ) {
      return throwError( ErrorMessage );
    } else {
      switch (errorResponse.error.error.message) {
        case  'EMAIL_EXISTS':
          ErrorMessage = 'this email id already exist.';
          break;
        case  'OPERATION_NOT_ALLOWED':
          ErrorMessage = 'your login can not be opratable' ;
          break;
        case  'EMAIL_NOT_FOUND':
          ErrorMessage = 'This email is not registered.';
          break;
        case  'INVALID_PASSWORD':
          ErrorMessage = 'Wrong Password!' ;
          break;
      }
      return throwError( ErrorMessage );
    }
  }

  private handleAuthantication(email: string , useridId: string , tokan: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000) ;
    const user = new User(email, useridId, tokan , expirationDate);
    this.user.next( user );
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userdata', JSON.stringify(user));
  }
}

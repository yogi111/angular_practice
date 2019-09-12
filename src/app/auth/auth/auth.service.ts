import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

interface Authresponce {
  idToken: string ;
  email: string ;
  refreshToken: string ;
  expiresIn: string ;
  localId: string ;
}
@Injectable({providedIn : "root"})
export class AuthService {
  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
      return this.http.post<Authresponce>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfdhw3aRT0eCqfXIPQm2eMcmQ6-kp4TwM'
      , {
          'email' : email,
          'password': password,
          'returnSecureToken' : true
        });
  }
}

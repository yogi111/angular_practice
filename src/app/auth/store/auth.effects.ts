import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.action';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../auth/user.model';

export interface Authresponce {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}

const handleError = (errRes) => {
    let ErrorMessage = 'Unknowen Error Occurred !!';
    if (!errRes.error || !errRes.error.error) {
        return of(new AuthActions.AuthenticationFail(ErrorMessage));
    } else {
        switch (errRes.error.error.message) {
            case  'EMAIL_EXISTS':
                ErrorMessage = 'this email id already exist.';
                break;
            case  'OPERATION_NOT_ALLOWED':
                ErrorMessage = 'your login can not be opratable';
                break;
            case  'EMAIL_NOT_FOUND':
                ErrorMessage = 'This email is not registered.';
                break;
            case  'INVALID_PASSWORD':
                ErrorMessage = 'Wrong Password!';
                break;
        }
        return of(new AuthActions.AuthenticationFail(ErrorMessage));
    }
};
const handleAuthentication = (
    email: string,
    userid: string,
    token: string,
    expirein: number
) => {
    const expirationDate = new Date(new Date().getTime() + expirein * 1000);
    const user = new User(email, userid, token, expirationDate);
    localStorage.setItem('userdata', JSON.stringify(user));
    return new AuthActions.AuthenticationSucsess({
        email,
        userId: userid,
        token,
        expirationDate,
    });
};

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.action$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((authData: AuthActions.SignupStart) => {
            return this.http.post<Authresponce>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfdhw3aRT0eCqfXIPQm2eMcmQ6-kp4TwM'
                , {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                tap((resData) => {
                    this.authservice.SetLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resolveData => {
                    return handleAuthentication(resolveData.email, resolveData.localId, resolveData.idToken, +resolveData.expiresIn);
                }),
                catchError(errRes => {
                    return handleError(errRes);
                })
            );
        })
    );
    @Effect()
    authLogin = this.action$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<Authresponce>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfdhw3aRT0eCqfXIPQm2eMcmQ6-kp4TwM',
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                tap((resData) => {
                    this.authservice.SetLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resolveData => {
                    return handleAuthentication(resolveData.email, resolveData.localId, resolveData.idToken, +resolveData.expiresIn);
                }),
                catchError(errRes => {
                    return handleError(errRes);
                })
            );
        })
    );

    // // @ts-ignore
    // @Effect({ dispatch: false })
    // authRedirect = this.action$.pipe(ofType(AuthActions.AUTHENTICATE_SUCSESS), tap((ref) => {
    //         this.router.navigate(['../'], { relativeTo: this.route });
    //     })
    // );

    @Effect()
    autologin = this.action$.pipe(ofType(AuthActions.AUTO_LOGIN), map(() => {
        const userdata: {
            email: string,
            Id: string,
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userdata'));
        if (!userdata) {
            return { type: 'dummy' };
        }
        const LoadUser = new User(userdata.email, userdata.Id, userdata._token, new Date(userdata._tokenExpirationDate));
        if (LoadUser.token) {
            const tokenExptimer = new Date(userdata._tokenExpirationDate).getTime() - new Date().getTime();
            this.authservice.SetLogoutTimer(tokenExptimer);
            return new AuthActions.AuthenticationSucsess({
                email: LoadUser.email,
                userId: LoadUser.Id,
                token: LoadUser.token,
                expirationDate: new Date(userdata._tokenExpirationDate)
            });
        } else {
            return { type: 'dummy' };
        }
    }));

    @Effect({ dispatch: false })
    autologout = this.action$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
        this.authservice.ClearLogoutTimer();
        localStorage.removeItem('userdata');
        this.router.navigate(['auth']);
    }));

    constructor(private action$: Actions,
                private http: HttpClient,
                private route: ActivatedRoute,
                private router: Router,
                private authservice: AuthService) {
    }
}

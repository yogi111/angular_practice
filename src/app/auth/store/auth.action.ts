import { Action } from '@ngrx/store';
export const LOGIN_START = '[Auth] login start';
export const AUTHENTICATE_SUCSESS = '[Auth] authenticated';
export  const AUTHENTICATE_FAIL = '[Auth]  Authentication fail';
export  const LOGOUT = '[Auth] Logout';
export const SIGNUP_START = '[Auth] signup start';
export  const AUTO_LOGIN = '[Auth] auto-Login';

export class AuthenticationSucsess implements  Action {
   readonly type = AUTHENTICATE_SUCSESS;
   constructor(
       public payload: {
      email: string;
      userId: string,
      token: string,
      expirationDate: Date;
       })  { }
}
export class Logout implements Action {
    readonly  type = LOGOUT;
}
export  class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(
        public payload: {
        email: string,
        password: string
        }) { }
}

export  class AuthenticationFail implements Action {
    readonly type = AUTHENTICATE_FAIL;
    constructor( public payload: string) { }
}

export  class SignupStart implements Action {
    readonly  type = SIGNUP_START;
    constructor(
        public payload: {
            email: string,
            password: string
        }
    ) { }
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions = AuthenticationSucsess | Logout | LoginStart | AuthenticationFail | SignupStart | AutoLogin;

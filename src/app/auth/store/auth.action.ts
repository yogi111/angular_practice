import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] login';
export  const LOGOUT = '[Auth] Logout';

export class Login  implements  Action {
   readonly type = LOGIN;
   constructor(
       public payload: {
      email: string;
      userId: string,
      token: string,
      expirationDate: Date;
       })  { }
}
export class Logout {
    readonly  type = LOGOUT;
}

export type AuthActions = Login | Logout;

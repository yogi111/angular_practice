import { User } from '../auth/user.model';
import * as AuthAction from '../store/auth.action';
export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState = {
    user: null,
    authError: null,
    loading: false
}
export function AuthReducer(state = initialState , action: AuthAction.AuthActions) {
    switch (action.type) {
        case AuthAction.AUTHENTICATE_SUCSESS:
            const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
            return {
                ...state,
                authError: null,
                user,
                loading: false
            };
        case AuthAction.LOGOUT:
            return  {
                ...state,
                user: null
            };
        case AuthAction.LOGIN_START:
        case AuthAction.SIGNUP_START:
            return  {
                ...state,
                authError: null,
                loading: true
            };
        case AuthAction.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            };
        default:
            return  state;
    }
}

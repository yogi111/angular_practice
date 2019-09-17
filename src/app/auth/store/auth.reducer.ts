import { User } from '../auth/user.model';
import * as AuthAction from '../store/auth.action';
export interface State {
    user:User;
}

const initialState = {
    user: null
}
export function AuthReducer(state = initialState , action: AuthAction.AuthActions) {
    switch(action.type) {
        case AuthAction.LOGIN:
            const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
            return {
                ...state,
                user
            };
        case AuthAction.LOGOUT:
            return  {
                ...state,
                user: null
            };
        default:
            return  state;
    }
}

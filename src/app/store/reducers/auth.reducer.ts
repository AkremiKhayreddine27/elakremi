
import { User } from '../../@core/data/models';
import * as fromAuthActions from '../actions/auth.action';

export interface AuthState {
    user: User;
    loggedIn: boolean;
    error: any;
}

export const initialState: AuthState = {
    user: null,
    loggedIn: false,
    error: null,
}

export function authReducer(
    state: AuthState = initialState,
    action: fromAuthActions.AuthAction): AuthState {
    switch (action.type) {
        case fromAuthActions.LOGIN: {
            return {
                ...state,
                loggedIn: false,
            }
        }
        case fromAuthActions.LOGIN_FAIL: {
            return {
                ...state,
                loggedIn: false,
                error: action.error,
            }
        }
        case fromAuthActions.LOGIN_SUCCESS: {
            return {
                ...state,
                loggedIn: true,
                user: action.user,
                error: null,
            }
        }
        case fromAuthActions.CHECK: {
            return {
                ...state,
                loggedIn: false,
            }
        }
        case fromAuthActions.CHECK_FAIL: {
            return {
                ...state,
                loggedIn: false,
                user: null,
                error: action.error,
            }
        }
        case fromAuthActions.CHECK_SUCCESS: {
            return {
                ...state,
                loggedIn: true,
                user: action.user,
                error: null,
            }
        }
    }
    return state;
}

export const getAuth = (state: AuthState) => { return state.user }
export const getLoggedIn = (state: AuthState) => { return state.loggedIn }

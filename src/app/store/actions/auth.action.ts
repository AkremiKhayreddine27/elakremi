import { Action } from '@ngrx/store';

import { User } from '../../@core/data/models';

export const LOGIN = '[Auth] Login';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const CHECK = '[Auth] Check';
export const CHECK_FAIL = '[Auth] Check Fail';
export const CHECK_SUCCESS = '[Auth] Check Success';


export class Login implements Action {
    readonly type = LOGIN;
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public error: any) { }
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public user: User) { }
}

export class Check implements Action {
    readonly type = CHECK;
}

export class CheckFail implements Action {
    readonly type = CHECK_FAIL;
    constructor(public error: any) { }
}

export class CheckSuccess implements Action {
    readonly type = CHECK_SUCCESS;
    constructor(public user: User) { }
}

export type AuthAction = Login | LoginFail | LoginSuccess | Check | CheckFail | CheckSuccess;


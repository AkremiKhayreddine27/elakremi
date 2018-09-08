import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromAuth from '../reducers/auth.reducer';
import { User } from '../../@core/data/models';


export const getAuthState = createSelector(
    fromFeature.getLocatusState,
    (state: fromFeature.LocatusState) => state.auth
);

export const getAuth = createSelector(
    getAuthState,
    fromAuth.getAuth
);

export const getLoggedIn = createSelector(
    getAuthState,
    fromAuth.getLoggedIn
);
import { ActionReducerMap, createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import * as fromDocuments from './documents.reducer';
import * as fromProperties from './properties.reducer';
import * as fromReservations from './reservations.reducer';
import * as fromServices from './services.reducer';
import * as fromPayments from './payments.reducer';
import * as fromAuth from './auth.reducer';
import { Document, Property, User, Payment, Reservation, Service } from '../../@core/data/models';

export interface LocatusState {
    auth: fromAuth.AuthState;
    properties: fromProperties.PropertiesState;
    reservations: fromReservations.ReservationsState,
    services: fromServices.ServicesState,
    payments: fromPayments.PaymentsState,
    documents: fromDocuments.DocumentState;
}

export const reducers: ActionReducerMap<LocatusState> = {
    auth: fromAuth.authReducer,
    properties: fromProperties.propertiesReducer,
    documents: fromDocuments.documentReducer,
    reservations: fromReservations.reservationsReducer,
    services: fromServices.servicesReducer,
    payments: fromPayments.paymentsReducer
}

export const getLocatusState = createFeatureSelector<LocatusState>('locatus');
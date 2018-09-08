import { Action } from '@ngrx/store';

import { Service, Payment } from '../../@core/data/models';
import { Pagination, FilterConf, SortConf } from '../helpers';

export const LOAD_SERVICES = '[Services] Load Services';
export const LOAD_SERVICES_FAIL = '[Services] Load Services Fail';
export const LOAD_SERVICES_SUCCESS = '[Services] Load Services Success';
export const SELECT_SERVICE = '[Services] Select Service';
export const LOAD_SELECTED_SERVICE = '[Services] Load Selected Service';
export const LOAD_SELECTED_SERVICE_FAIL = '[Services] Load Selected Service Fail';
export const LOAD_SELECTED_SERVICE_SUCCESS = '[Services] Load Selected Service Success';
export const CREATE_SERVICE = '[Services] Create Service';
export const CREATE_SERVICE_SUCCESS = '[Services] Create Service Success';
export const CREATE_SERVICE_FAIL = '[Services] Create Service Fail';
export const UPDATE_SERVICE = '[Services] Update Service';
export const UPDATE_SERVICE_SUCCESS = '[Services] Update Service Success';
export const UPDATE_SERVICE_FAIL = '[Services] Update Service Fail';
export const DELETE_SERVICE = '[Services] Delete Service';
export const DELETE_SERVICE_SUCCESS = '[Services] Delete Service Success';
export const DELETE_SERVICE_FAIL = '[Services] Delete Service Fail';

export class LoadServices implements Action {
    readonly type = LOAD_SERVICES;
    constructor(public filters: FilterConf = null, public sort: SortConf[] = null, public pagination: Pagination = null) { }

}

export class LoadServicesFail implements Action {
    readonly type = LOAD_SERVICES_FAIL;
    constructor(public payload: any) { }
}

export class LoadServicesSuccess implements Action {
    readonly type = LOAD_SERVICES_SUCCESS;
    constructor(public payload: Service[]) { }
}

export class SelectService implements Action {
    readonly type = SELECT_SERVICE;
    constructor(public payload: number) { }
}

export class LoadSelectedService implements Action {
    readonly type = LOAD_SELECTED_SERVICE;
}

export class LoadSelectedServiceFail implements Action {
    readonly type = LOAD_SELECTED_SERVICE_FAIL;
    constructor(public payload: any) { }
}

export class LoadSelectedServiceSuccess implements Action {
    readonly type = LOAD_SELECTED_SERVICE_SUCCESS;
    constructor(public payload: Service) { }
}

export class CreateService implements Action {
    readonly type = CREATE_SERVICE;
    constructor(public payload: Service) { }
}

export class CreateServiceSuccess implements Action {
    readonly type = CREATE_SERVICE_SUCCESS;
    constructor(public payload: Service) { }
}

export class CreateServiceFail implements Action {
    readonly type = CREATE_SERVICE_FAIL;
    constructor(public payload: any) { }
}

export class UpdateService implements Action {
    readonly type = UPDATE_SERVICE;
    constructor(
        public id: number,
        public changes: Partial<Service>,
    ) { }
}

export class UpdateServiceSuccess implements Action {
    readonly type = UPDATE_SERVICE_SUCCESS;
    constructor(
        public id: number,
        public changes: Partial<Service>,
    ) { }
}

export class UpdateServiceFail implements Action {
    readonly type = UPDATE_SERVICE_FAIL;
    constructor(public payload: any) { }
}

export class DeleteService implements Action {
    readonly type = DELETE_SERVICE;
    constructor(public id: number) { }
}

export class DeleteServiceSuccess implements Action {
    readonly type = DELETE_SERVICE_SUCCESS;
    constructor(public id: number) { }
}

export class DeleteServiceFail implements Action {
    readonly type = DELETE_SERVICE_FAIL;
    constructor(public payload: any) { }
}

export type ServicesAction =
    LoadServices |
    LoadServicesFail |
    LoadServicesSuccess |
    SelectService |
    LoadSelectedService |
    LoadSelectedServiceFail |
    LoadSelectedServiceSuccess |
    CreateService |
    CreateServiceSuccess |
    CreateServiceFail |
    UpdateService |
    UpdateServiceSuccess |
    UpdateServiceFail |
    DeleteService |
    DeleteServiceSuccess |
    DeleteServiceFail;
import { Observable } from 'rxjs/Observable';

export interface LocatusFilter {
    name: string;
    type: string;
    field: string;
    element?: any;
    elements?: Observable<any[]>;
    placeholder?: string;
    action?: string;
    bindLabel?: string;
    callback?: (cell: any, search: any) => boolean;
}
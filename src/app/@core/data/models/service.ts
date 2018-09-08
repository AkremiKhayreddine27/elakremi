import { User } from './user';
import { Document } from './document';
import { Payment } from './payment';
import { Property } from './property';
import { SelectItem } from './selectItem';
import { Price } from './price';
import { Reservation } from './reservation';

export interface Service {
    kind: string;
    id: number;
    title: string;
    description: string;
    start: any;
    end: any;
    createdAt: any;
    priority: string;
    type: SelectItem;
    category: SelectItem;
    deadline: any;
    status: SelectItem;
    provider: User;
    contractNumber: string;
    contractDate: any;
    price: Price;
    frequency: SelectItem;
    tva: number;
    payments?: Payment[];
    documents?: Document[];
    reservation?: Reservation;
    property?: Property;
}

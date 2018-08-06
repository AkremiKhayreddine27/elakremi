import { User } from './user';
import { Document } from './document';
import { Payment } from './payment';
import { SelectItem } from './selectItem';
import { Price } from './price';
import { Property } from './property';
export interface Reservation {
    id: number;
    title: string;
    description?: string;
    status: SelectItem;
    start: any;
    end: any;
    reservationDate: any;
    deadlineDate: any;
    createdAt: any;
    updatedAt: any;
    price: Price;
    balance: Price;
    adjusted: Price;
    deposit: number;
    bail: Price;
    nbrAdultes: number;
    nbrChildren: number;
    nbrPets: number;
    lodger: User;
    payments?: Payment[];
    documents?: Document[];
    property?: Property;
    nbrNight?: any;
    platform: SelectItem;
}

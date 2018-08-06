import { User } from './user';
import { Price } from './price';
import { SelectItem } from './selectItem';
export interface Payment {
    id: number,
    description: string,
    price: Price,
    balance?: Price,
    tva: string,
    status: SelectItem,
    method: SelectItem,
    type: SelectItem,
    paymentDate: any,
    deadlineDate: any,
    payer: User,
    payee?: User,
    nomenclature: any;
    propertyId: number;
}

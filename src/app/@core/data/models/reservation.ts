import { User } from './user';
import { Document } from './document';
import { Payment } from './payment';
export interface Reservation {
    id: number,
    title: string,
    description: string,
    status: string,
    startDate: any,
    endDate: any,
    reservationDate: any,
    paymentStatus: string,
    createdAt: any,
    amount: number,
    nbrAdultes: number,
    nbrChildren: number,
    nbrPets: number,
    lodger: User,
    payments: Payment[],
    documents: Document[]
}
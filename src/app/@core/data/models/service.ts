import { User } from './user';
import { Document } from './document';
import { Payment } from './payment';
export interface Service {
    id: number,
    title: string,
    description: string,
    startDate: any,
    endDate: any,
    subscriptionDate: any,
    createdAt: any,
    priority: string,
    type: any,
    deadline: string,
    status: string,
    provider: User,
    numeroContrat: string,
    tariff: any,
    paymentStatus: string,
    payments: Payment[],
    documents: Document[],
    reservationId?: number
}
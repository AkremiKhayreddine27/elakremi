import { User } from './user';
export interface Payment {
    id: number,
    description: string,
    amount: number,
    tva: string,
    status: string,
    method: string,
    type: any,
    paymentDate: any,
    deadlineDate: any,
    payer: User
}
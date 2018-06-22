import { User } from './user';
import { Equipement } from './equipement';
import { Service } from './service';
import { Reservation } from './reservation';
import { Document } from './document';
import { Calendar } from 'ngx-calendar';
import { Tariff } from './tariff';
export interface Property {
    id: number,
    title: string,
    description?: string,
    status: string,
    type: string,
    nbr_chambre: number,
    nbr_cuisine: number,
    nbr_salon: number,
    platforms: any[],
    images: any[],
    owner?: User,
    location: any,
    rate?: number,
    votes?: number,
    amount?: number,
    links: any[],
    equipements: Equipement[],
    calendars: Calendar[],
    services: Service[],
    reservations: Reservation[],
    documents?: Document[],
    tariff?: Tariff
}
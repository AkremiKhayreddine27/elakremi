import { User } from './user';
import { Equipement } from './equipement';
import { Service } from './service';
import { Reservation } from './reservation';
import { Document } from './document';
import { Calendar } from 'ngx-calendar';
import { Tariff } from './tariff';
export interface Property {
    id: number;
    title: string;
    description?: string;
    status: any;
    type: any;
    language?: any;
    currency?: any;
    nbrRooms?: number;
    nbrKitchens?: number;
    nbrLounges?: number;
    nbrBathrooms?: number;
    nbrBeds?: number;
    capacity?: number;
    suitableForEvents?: boolean;
    acceptedAnimals?: boolean;
    smokingAccommodation?: boolean;
    cellar?: boolean;
    terrace?: boolean;
    garage?: boolean;
    balkon?: boolean;
    garden?: boolean;
    guardian?: boolean;
    platform?: any;
    images?: any[];
    owner?: User;
    location: any;
    rate?: number;
    votes?: number;
    amount?: number;
    links?: any[];
    equipements?: Equipement[];
    amenities?: any[];
    calendars?: Calendar[];
    services?: Service[];
    reservations?: Reservation[];
    documents?: Document[];
    tariff?: Tariff;
}



import { Injectable } from '@angular/core';
import * as dateFns from 'date-fns';
import { DataService } from './data.abstract';
import { Property } from './models/property';
import * as faker from 'faker';
import { SeasonalTariffService } from './seasonal-tariff.service';
import { EventTariffService } from './event-tariff.service';

@Injectable()
export class TariffsService extends DataService {

    generate(property: Property) {
        let tariff = {
            id: faker.random.number(),
            property: property,
            bail: 300,
            deposit: 20
        }
        this.seasonalTariffService.generate(tariff);
        this.eventTariffService.generate(tariff);
        this.data.push(tariff);
    }

    findActiveTariff() {
        if (this.eventTariffService.hasActiveEvent()) {
            return this.eventTariffService.findByActiveEvent();
        }
        return this.seasonalTariffService.findByActivePeriod();
    }

    public eventTarifs = [
        {
            title: 'Evénnement',
            active: true,
            seasons: [
                {
                    id: 1,
                    title: 'Evénnement 1',
                    amount: 80,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 2,
                    title: 'Evénnement 2',
                    amount: 100,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 3,
                    title: 'Evénnement 3',
                    amount: 90,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 4,
                    title: 'Evénnement 4',
                    amount: 120,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                }
            ]
        }
    ];



    constructor(
        public seasonalTariffService: SeasonalTariffService,
        public eventTariffService: EventTariffService) {
        super();
    }

}
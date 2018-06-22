import { Injectable } from '@angular/core';

@Injectable()
export class TariffsService {

    public tariffs = [
        {
            title: 'Nuit',
            active: false,
            seasons: [
                {
                    id: 1,
                    title: 'Standard',
                    amount: 80,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 2,
                    title: 'Haute',
                    amount: 100,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 3,
                    title: 'Moyenne',
                    amount: 90,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 4,
                    title: 'Basse',
                    amount: 120,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                }
            ]
        },
        {
            title: 'Weekend',
            active: true,
            seasons: [
                {
                    id: 1,
                    title: 'Standard',
                    amount: 80,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 2,
                    title: 'Haute',
                    amount: 100,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 3,
                    title: 'Moyenne',
                    amount: 90,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 4,
                    title: 'Basse',
                    amount: 120,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                }
            ]
        },
        {
            title: 'Semaine',
            active: false,
            seasons: [
                {
                    id: 1,
                    title: 'Standard',
                    amount: 80,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 2,
                    title: 'Haute',
                    amount: 100,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 3,
                    title: 'Moyenne',
                    amount: 90,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 4,
                    title: 'Basse',
                    amount: 120,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                }
            ]
        },
        {
            title: 'Mois',
            active: false,
            seasons: [
                {
                    id: 1,
                    title: 'Standard',
                    amount: 80,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 2,
                    title: 'Haute',
                    amount: 100,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 3,
                    title: 'Moyenne',
                    amount: 90,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                },
                {
                    id: 4,
                    title: 'Basse',
                    amount: 120,
                    startDate: new Date(),
                    endDate: new Date(),
                    minDuration: 7
                }
            ]
        }
    ];

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

    add(season) {
        this.tariffs.map(tariff => {
            if (tariff.title === 'Nuit') {
                tariff.seasons.push({
                    id: season.id,
                    title: season.title,
                    startDate: season.startDate,
                    endDate: season.endDate,
                    amount: season.nightAmount,
                    minDuration: 1
                });
            } else if (tariff.title === 'Weekend') {
                tariff.seasons.push({
                    id: season.id,
                    title: season.title,
                    startDate: season.startDate,
                    endDate: season.endDate,
                    amount: season.weekendAmount,
                    minDuration: 1
                });
            } else if (tariff.title === 'Semaine') {
                tariff.seasons.push({
                    id: season.id,
                    title: season.title,
                    startDate: season.startDate,
                    endDate: season.endDate,
                    amount: season.weekAmount,
                    minDuration: 1
                });
            } else if (tariff.title === 'Mois') {
                tariff.seasons.push({
                    id: season.id,
                    title: season.title,
                    startDate: season.startDate,
                    endDate: season.endDate,
                    amount: season.monthAmount,
                    minDuration: 1
                });
            }
        });
    }

    update(season) {
        this.tariffs.map(tariff => {
            tariff.seasons.map(s => {
                if (s.id === season.id) {
                    s.title = season.title;
                    s.amount = season.amount;
                    s.startDate = season.startDate;
                    s.endDate = season.endDate;
                }
            });
        });
    }

    addTarifEvent(tariffEvent) {
        this.eventTarifs.map(tariff => {
            tariff.seasons.push({
                id: tariffEvent.id,
                title: tariffEvent.title,
                startDate: tariffEvent.startDate,
                endDate: tariffEvent.endDate,
                amount: tariffEvent.amount,
                minDuration: 1
            });
        });
    }

    updateTarifEvent(tariffEvent) {
        this.eventTarifs.map(tariff => {
            tariff.seasons.map(s => {
                if (s.id === tariffEvent.id) {
                    s.title = tariffEvent.title;
                    s.amount = tariffEvent.amount;
                    s.startDate = tariffEvent.startDate;
                    s.endDate = tariffEvent.endDate;
                }
            });
        });
    }

}
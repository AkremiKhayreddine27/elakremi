import { Injectable } from '@angular/core';

@Injectable()
export class EquipementsService {

    public categories = [
        {
            title: 'Meubles & Déco',
            equipements: [
                {
                    name: 'Armoire'
                },
                {
                    name: 'Penderie'
                },
                {
                    name: 'Placard'
                },
                {
                    name: 'Moustiquaire aux fenêtres'
                },
                {
                    name: 'Poêle à bois'
                }
            ]
        },
        {
            title: 'Literie & Linge',
            equipements: []
        },
        {
            title: 'Electroménager',
            equipements: [
                {
                    name: 'Réfrigérateur'
                },
                {
                    name: 'Congélateur'
                },
                {
                    name: 'Four'
                },
                {
                    name: 'Mini-four'
                },
                {
                    name: 'Micro-ondes'
                },
                {
                    name: 'Cafetière'
                }
            ]
        },
        {
            title: 'Multimédia & Téléphonie',
            equipements: [
                {
                    name: 'Téléphone'
                },
                {
                    name: 'Fax'
                },
                {
                    name: 'Ordinateur'
                },
                {
                    name: 'Wifi'
                }
            ]
        },
        {
            title: 'Brico & Jardinage',
            equipements: []
        },
        {
            title: 'Sport & Loisir',
            equipements: []
        },
        {
            title: 'Autre',
            equipements: []
        }
    ]; 
 
    all() {
        return this.categories;
    }

}
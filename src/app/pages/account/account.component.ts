import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'security',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    tabs: any[] = [
        {
            title: 'Informations Personnelles',
            route: '/pages/account/personal-informations',
        },
        {
            title: 'Connexion et Sécurité',
            route: '/pages/account/security',
        },
        {
            title: 'Préférences',
            route: '/pages/account/preferences',
        },
    ];

    constructor() { }

    ngOnInit() {
    }

}

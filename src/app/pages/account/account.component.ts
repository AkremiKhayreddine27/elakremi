import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'security',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    hasOverlay = false;

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

    optionsClicked() {
        this.hasOverlay = !this.hasOverlay;
    }

    save() {

    }

}

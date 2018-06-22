import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import * as faker from 'faker';


@Component({
  selector: 'personal-informations',
  templateUrl: './personal-informations.component.html',
  styleUrls: ['./personal-informations.component.scss']
})
export class PersonalInformationsComponent implements OnInit {

  user: any = {};

  location: any = {};

  constructor(protected authService: NbAuthService, private http: HttpClient) { }

  ngOnInit() {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = {
            id: 1,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            role: 'locataire',
            phone: faker.phone.phoneNumber(),
            location: {
              country: 'France',
              city: 'Issy-les-Moulineaux',
              state: 'Ile-de-France',
              address: 'Info Municipale, Chemin de Bretagne',
              longitude: 2.2582740783036575,
              latitude: 48.82377450294101,
              postcode: '92130',
              isValid: true
            }
          };
        }
      });
  }

}

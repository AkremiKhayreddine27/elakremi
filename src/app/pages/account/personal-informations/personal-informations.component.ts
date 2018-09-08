import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/data/services/auth.service';


@Component({
  selector: 'personal-informations',
  templateUrl: './personal-informations.component.html',
  styleUrls: ['./personal-informations.component.scss']
})
export class PersonalInformationsComponent implements OnInit {

  location;

  constructor(public authService: AuthService) { }

  ngOnInit() {

  }

}

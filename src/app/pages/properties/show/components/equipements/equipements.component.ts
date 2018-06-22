import { Component, OnInit, Input } from '@angular/core';
import { EquipementsService } from '../../../../../@core/data/equipements.service';

@Component({
  selector: 'app-equipements',
  templateUrl: './equipements.component.html',
  styleUrls: ['./equipements.component.scss']
})
export class EquipementsComponent implements OnInit {

  isCollapsed: boolean = true;
  
  @Input() equipements;

  categories = [];

  constructor(private equipementsServices: EquipementsService) { }

  ngOnInit() {
    this.categories = this.equipementsServices.all();
  }

}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../../../@core/data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocatusAbstractComponent } from '../../../@core/utils/locatusComponent.abstract';

@Component({
  selector: 'lodgers',
  templateUrl: './lodgers.component.html',
  styleUrls: ['./lodgers.component.scss']
})
export class LodgersComponent extends LocatusAbstractComponent implements OnInit {

  constructor(
    public router: Router,
    public cdr: ChangeDetectorRef,
    public dataService: ContactsService,
    public modalService: NgbModal) {
    super(router, modalService, cdr, dataService);
  }

  ngOnInit() {
    this.source.load(this.dataService.findBy('role.id', 2));
    this.detectSourceChanges();
  }

}

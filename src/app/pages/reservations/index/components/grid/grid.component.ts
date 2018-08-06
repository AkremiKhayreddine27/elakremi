import { Component, OnInit, Input } from '@angular/core';
import { PropertyService } from '../../../../../@core/data/property.service';
import { map } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReservationsService } from '../../../../../@core/data/reservations.service';
import { DeleteConfirmationComponent } from '../../../../../@theme/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'reservations-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input() reservations;

  constructor(private propertyService: PropertyService, private reservationService: ReservationsService, private modalService: NgbModal, ) { }

  ngOnInit() {
    this.reservations.map(reservation => {
      reservation.property = this.propertyService.currentProperty;
    });
  }

  delete(reservation) {
    const modalRef = this.modalService.open(DeleteConfirmationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.type = 'reservation';
    modalRef.componentInstance.title = reservation.title;
    modalRef.result.then(confirmed => {
      if (confirmed) {
        this.reservationService.delete(reservation);
      }
    }, (reason) => {

    });
  }

}

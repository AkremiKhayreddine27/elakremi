import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../../../../@core/data/property.service';
import { ServicesService } from '../../../../../@core/data/services.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationComponent } from '../../../../../@theme/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input() properties;

  constructor(private service: PropertyService, private servicesService: ServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {

  }

  delete(property) {
    const modalRef = this.modalService.open(DeleteConfirmationComponent, { size: 'lg', container: 'nb-layout' });
    modalRef.componentInstance.type = 'bien';
    modalRef.componentInstance.title = property.title;
    modalRef.result.then(confirmed => {
      if (confirmed) {
        this.service.remove(property);
      }
    }, (reason) => {

    });
  }

  navigate(link, property) {
    if (link === 'categories/services') {
      this.servicesService.setCurrentService(null);
    }
    this.service.setCurrentProperty(property);
    this.router.navigate(['/pages/' + link]);
  }
}

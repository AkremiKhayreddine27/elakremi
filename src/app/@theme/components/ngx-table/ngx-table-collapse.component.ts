import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { NgxTableService } from './ngxTableService.service';

@Component({
    selector: 'ngx-collapse-table',
    template: '<ng-template #collapse></ng-template>'
})
export class NgxCollapseTableComponent implements OnInit, OnChanges {

    @Input() data;

    @Input() nomenclature;

    @Input() component;

    @ViewChild('collapse', {
        read: ViewContainerRef
    }) viewContainerRef: ViewContainerRef;

    constructor(private service: NgxTableService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.component && !changes.component.firstChange) {
            this.service.addDynamicComponent(this.viewContainerRef, this.component, this.data, this.nomenclature);
        }
    }

}

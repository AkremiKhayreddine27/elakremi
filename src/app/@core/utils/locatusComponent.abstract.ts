import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { DeleteConfirmationComponent } from '../../@theme/components/delete-confirmation/delete-confirmation.component';

export abstract class LocatusAbstractComponent {

    url: string;

    data: Observable<any[]>;

    source: LocalDataSource = new LocalDataSource();

    filters = [];

    searchFields: string[] = [];

    isSearching: boolean = false;

    isFilterCollapsed: boolean = true;

    isGridView: boolean = false;

    withFilters: boolean = false;

    sourceSubscription: Subscription;

    constructor(public router: Router, public modalService: NgbModal, public cdr: ChangeDetectorRef, public dataService: any) {

    }

    create() {
        this.router.navigateByUrl(this.url + '/create');
    }

    edit(item: any) {
        this.router.navigateByUrl(this.url + '/' + item.id + '/edit');
    }

    delete(item: any) {
        const modalRef = this.modalService.open(DeleteConfirmationComponent, { size: 'lg', container: 'nb-layout' });
        modalRef.componentInstance.type = 'reservation';
        modalRef.componentInstance.title = item.title;
        modalRef.result.then(confirmed => {
            if (confirmed) {
                this.dataService.delete(item);
                this.source.load(this.dataService.all());
            }
        }, (reason) => {

        });
    }

    handleRowEvent(event) {
        this[event.action](event.attribute);
    }

    handleHeaderEvent(event) {
        this[event.action]();
    }

    handleDropdownEvent(event) {
        this[event.item.action](event.item);
    }

    search() {
        this.isSearching = !this.isSearching;
        this.isFilterCollapsed = true;
    }

    toggleDisplay() {
        this.isGridView = !this.isGridView;
        this.isGridView ? this.source.setPaging(1, 12) : this.source.setPaging(1, 10);
    }

    filter() {
        this.isFilterCollapsed = !this.isFilterCollapsed;
        this.isSearching = false;
    }

    handleFilter(action, data) {
        this[action](data);
    }

    hasFilters(filters) {
        const w = filters.filter(f => {
            return f.search !== '';
        });
        this.withFilters = w.length === 0 ? false : true;
        this.cdr.detectChanges();
    }

    sort(element) {
        element.direction = element.direction === 'asc' ? 'desc' : 'asc';
        this.source.setSort([
            {
                field: element.value,
                direction: element.direction,
                compare: function (direction: any, a: any, b: any) {

                    let f = a.value || a.value === 0 ? a.value : a;
                    let s = b.value || b.value === 0 ? b.value : b;

                    let first = typeof f === 'string' ? f.toLowerCase() : f;
                    let second = typeof s === 'string' ? s.toLowerCase() : s;

                    if (first < second) {
                        return -1 * direction;
                    }
                    if (first > second) {
                        return direction;
                    }
                    return 0;
                }
            }
        ]);
    }

    detectSourceChanges() {
        this.sourceSubscription = this.source.onChanged().subscribe(value => {
            this.data = of(value.elements).pipe(delay(5));
        });
    }

}
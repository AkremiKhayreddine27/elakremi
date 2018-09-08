import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'chart-panel-summary',
    templateUrl: './chart-panel-summary.component.html',
    styleUrls: ['./chart-panel-summary.component.scss']
})
export class ChartPanelSummaryComponent implements OnInit {

    @Input() summary: { title: string; value: number }[];

    constructor() { }

    ngOnInit() {
    }

}

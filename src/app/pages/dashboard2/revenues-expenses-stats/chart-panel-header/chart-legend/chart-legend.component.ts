import { Component, OnInit, Input } from '@angular/core';
import { NgxLegendItemColor } from './enum.legend-item-color';

@Component({
  selector: 'chart-legend',
  templateUrl: './chart-legend.component.html',
  styleUrls: ['./chart-legend.component.scss']
})
export class ChartLegendComponent implements OnInit {

  /**
 * Take an array of legend items
 * Available iconColor: 'green', 'purple', 'light-purple', 'blue', 'yellow'
 * @type {{iconColor: string; title: string}[]}
 */
  @Input()
  legendItems: { iconColor: NgxLegendItemColor; title: string }[] = [];

  constructor() { }

  ngOnInit() {
  }

}

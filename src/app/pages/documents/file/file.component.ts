import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}

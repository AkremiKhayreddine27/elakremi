import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  isCollapsed: boolean = true; 

  @Input() documents;

  constructor() { }

  ngOnInit() {
  }

  onUploadError($event) {

  }

  onUploadSuccess($event) {

  }

}

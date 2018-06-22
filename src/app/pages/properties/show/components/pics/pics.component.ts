import { Component, OnInit, Input, Inject } from '@angular/core';
import { FineUploader } from 'fine-uploader';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-pics',
  templateUrl: './pics.component.html',
  styleUrls: ['./pics.component.scss']
})
export class PicsComponent implements OnInit {

  @Input() images;

  isCollapsed: boolean = true;

  private uploader;


  constructor(@Inject(DOCUMENT) document) { }

  ngOnInit() {
    this.uploader = new FineUploader({
      element: document.getElementById('uploader'),
      autoUpload: false,
      validation: {
        itemLimit: 1
      },
    });
  }

  upload() {
    this.uploader.uploadStoredFiles();
  }

}

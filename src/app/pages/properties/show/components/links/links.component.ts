import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  isCollapsed: boolean = true;
  
  @Input() links;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: false,
    },
    columns: {
      titre: {
        title: 'titre',
        type: 'string',
      },
      url: {
        title: 'URL',
        type: 'string',
      }
    },
  };


  private source = new LocalDataSource();

  constructor() { }

  ngOnInit() {
    this.source.load(this.links);
  }

}

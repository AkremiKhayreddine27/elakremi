import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[locatusDropzone]'
})
export class LocatusDropzoneDirective {

  @Output() dropped = new EventEmitter<FileList>();

  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event'])
  ondrop($event) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }

}

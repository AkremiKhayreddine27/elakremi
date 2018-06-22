import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]',
})
export class LinkDirective { 
  constructor(public viewContainerRef: ViewContainerRef) { }
}
import { Component, Input } from '@angular/core';

@Component({ 
  template: `
  <div class="row">
  <div class="col-3">
    <div class="form-group">
      <input type="text" class="form-control" (keyup)="link.site = $event.target.value" placeholder="nom">
    </div>
  </div>
    <div class="col-8">
        <div class="form-group">
        <input type="text" class="form-control" placeholder="lien" (keyup)="link.href = $event.target.value">
        </div>
    </div>
    </div>
  `
})
export class LinkComponent {
  @Input() link: any;
}
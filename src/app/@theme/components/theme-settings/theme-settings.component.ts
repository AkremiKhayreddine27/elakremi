import { Component } from '@angular/core';

import { StateService, PropertyService } from '@core/data';

@Component({
  selector: 'ngx-theme-settings',
  styleUrls: ['./theme-settings.component.scss'],
  template: `
    <button class="btn btn-success cursor-pointer" (click)="dbGenerate()">Base de données</button>
  `,
})
export class ThemeSettingsComponent {

  layouts = [];
  sidebars = [];

  constructor(
    public propertyService: PropertyService,
    protected stateService: StateService) {
    this.stateService.getLayoutStates()
      .subscribe((layouts: any[]) => this.layouts = layouts);

    this.stateService.getSidebarStates()
      .subscribe((sidebars: any[]) => this.sidebars = sidebars);
  }

  dbGenerate() {
    this.propertyService.generateProperties('firebase', 6);
  }

  layoutSelect(layout: any): boolean {
    this.layouts = this.layouts.map((l: any) => {
      l.selected = false;
      return l;
    });

    layout.selected = true;
    this.stateService.setLayoutState(layout);
    return false;
  }

  sidebarSelect(sidebars: any): boolean {
    this.sidebars = this.sidebars.map((s: any) => {
      s.selected = false;
      return s;
    });

    sidebars.selected = true;
    this.stateService.setSidebarState(sidebars);
    return false;
  }
}

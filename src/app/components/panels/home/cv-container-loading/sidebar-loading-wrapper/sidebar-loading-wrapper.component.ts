import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'sidebar-loading-wrapper',
  styleUrls: ['./sidebar-loading-wrapper.scss'],
  templateUrl: './sidebar-loading-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SidebarLoadingWrapper {
  @Input() delay: number;

  constructor() {
  }
}

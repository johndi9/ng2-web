import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'sidebar-wrapper',
  styleUrls: ['./sidebar-wrapper.scss'],
  templateUrl: './sidebar-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SidebarWrapper {
  @Input() delay: number;

  constructor() {
  }
}

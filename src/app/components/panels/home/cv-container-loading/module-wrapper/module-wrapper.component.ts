import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'module-wrapper',
  styleUrls: ['./module-wrapper.scss'],
  templateUrl: './module-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModuleWrapper {
  @Input() delay: number;

  constructor() {
  }
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'module-loading-wrapper',
  styleUrls: ['./module-loading-wrapper.scss'],
  templateUrl: './module-loading-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModuleLoadingWrapper {
  @Input() delay: number;

  constructor() {
  }
}

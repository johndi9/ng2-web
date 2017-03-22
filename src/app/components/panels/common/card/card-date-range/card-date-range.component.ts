import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'card-date-range',
  styleUrls: ['./card-date-range.scss'],
  templateUrl: './card-date-range.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardDateRange {
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() calculateDuration: boolean;

  constructor() {
  }

}

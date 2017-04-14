import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';


@Component({
  selector: 'card-date-range',
  styleUrls: ['./card-date-range.scss'],
  templateUrl: './card-date-range.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardDateRange implements OnInit {
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() calculateDuration: boolean;
  @Input() showOnlyYear: boolean;

  dateFormat: string;

  private readonly YEAR_MONTH_FORMAT: string = 'y/MM';
  private readonly YEAR_FORMAT: string = 'y';

  constructor() {
  }

  ngOnInit(): void {
    this.dateFormat = this.showOnlyYear ? this.YEAR_FORMAT : this.YEAR_MONTH_FORMAT;
  }

}

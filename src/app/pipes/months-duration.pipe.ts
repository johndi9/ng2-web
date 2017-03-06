import { Pipe, PipeTransform } from '@angular/core';

import {TranslateService} from '@ngx-translate/core';


@Pipe({
  name: 'monthsDuration'
})

export class MonthsDurationPipe implements PipeTransform {

  private readonly MONTH_IN_YEAR: number = 12;
  private labels: Object = {};

  constructor(private _translateService: TranslateService) {
    _translateService.get('labels').subscribe((labels: Object) => {
      this.labels = labels;
    });
  }

  /**
   * Formats the number of months into number of years + months.
   * @param numberOfMonths
   * @return {string}
   */
  transform(numberOfMonths: number): string {
    return this.getYearsString(numberOfMonths) + this.getMonthsString(numberOfMonths);
  }

  getYearsString(numberOfMonths): string {
    const years = Math.floor(numberOfMonths / this.MONTH_IN_YEAR);

    return years > 0 ?
      (years + ' ' + (years > 1 ? this.labels['years'] : this.labels['year']) + ' ') : '';
  }

  getMonthsString(numberOfMonths): string {
    const months = Math.floor(numberOfMonths % this.MONTH_IN_YEAR) + 1;

    return months > 0 ?
      (months + ' ' + (months > 1 ? this.labels['months'] : this.labels['month']) + ' ') : '';
  }

}

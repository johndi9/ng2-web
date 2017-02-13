import { Pipe, PipeTransform } from '@angular/core';

import { labels } from '../data/data';


@Pipe({
  name: 'monthsDuration'
})

export class MonthsDurationPipe implements PipeTransform {

  private readonly MONTH_IN_YEAR: number = 12;

  constructor() {
  }

  /**
   * Formats the number of months into number of years + months.
   * @param numberOfMonths
   * @return {string}
   */
  transform(numberOfMonths: number): string {
    if (!numberOfMonths) return;

    return this.getYearsString(numberOfMonths) + this.getMonthsString(numberOfMonths);
  }

  getYearsString(numberOfMonths): string {
    const years = Math.floor(numberOfMonths / this.MONTH_IN_YEAR);

    return years > 0 ?
      (years + ' ' + (years > 1 ? labels.years : labels.year) + ' ') : '';
  }

  getMonthsString(numberOfMonths): string {
    const months = Math.ceil(numberOfMonths % this.MONTH_IN_YEAR);

    return months > 0 ?
      (months + ' ' + (months > 1 ? labels.months : labels.month) + ' ') : '';
  }

}

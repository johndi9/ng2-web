import { Component, Input } from '@angular/core';


@Component({
  selector: 'ng2-footer',
  styleUrls: ['./ng2-footer.scss'],
  templateUrl: './ng2-footer.html'
})

export class Ng2Footer {
  @Input() name: string;

  private today: number = Date.now();

  constructor() {
  }
}

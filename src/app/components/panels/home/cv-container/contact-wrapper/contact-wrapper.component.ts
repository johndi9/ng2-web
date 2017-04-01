import { Component, Input, ChangeDetectionStrategy, AfterViewInit, ElementRef } from '@angular/core';

import { GoogleMapsService } from '../../../../../services/googleMaps.service';

import { Contact } from '../../../../../models/Curriculum/Contact/Contact';
import { Location } from '../../../../../models/Curriculum/Location/Location';
import { Social } from '../../../../../models/Curriculum/Social/Social';
import { KEYS } from '../../../../../variables/keys';



@Component({
  selector: 'contact-wrapper',
  styleUrls: ['./contact-wrapper.scss'],
  templateUrl: './contact-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactWrapper implements AfterViewInit {
  @Input() contact: Contact;
  @Input() location: Location;
  @Input() social: Social;

  constructor(private _googleMapsService: GoogleMapsService,
              private _element: ElementRef) {
  }

  ngAfterViewInit(){
    (<any>window).googleMapsReady=this.onMapsReady.bind(this);

    let script = this.creteStriptElement();
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  private creteStriptElement(): Element {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = this._googleMapsService.getGoogleMapsUrl();

    return script;
  }

  private onMapsReady(){
    this._googleMapsService.createMap(this._element.nativeElement.querySelector('.map'),
      this.location.city + ' ' + this.location.country);
  }

}

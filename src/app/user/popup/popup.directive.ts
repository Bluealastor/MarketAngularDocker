import { Directive, HostListener, Input } from '@angular/core';
import { PopupComponent } from './popup.component';

@Directive({
  selector: '[appPopup]'
})
export class PopupDirective {
  @Input() appPopup: PopupComponent;

  // @HostListener('click')
}

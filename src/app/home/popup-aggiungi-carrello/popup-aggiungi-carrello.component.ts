import { Component, HostListener } from '@angular/core';
import { AggiungiAlCarrelloService } from 'src/service/aggiuntacarrelloservice';

@Component({
  selector: 'app-popup-aggiungi-carrello',
  templateUrl: './popup-aggiungi-carrello.component.html',
  styleUrls: ['./popup-aggiungi-carrello.component.css'],
  

})
export class PopupAggiungiCarrelloComponent {
  constructor(private service: AggiungiAlCarrelloService){}
  get(){
    return this.service.getShowComponent()
  }
  
}

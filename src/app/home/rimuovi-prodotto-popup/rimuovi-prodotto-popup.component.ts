import { Component } from '@angular/core';
import { AggiungiAlCarrelloService } from 'src/service/aggiuntacarrelloservice';

@Component({
  selector: 'app-rimuovi-prodotto-popup',
  templateUrl: './rimuovi-prodotto-popup.component.html',
  styleUrls: ['./rimuovi-prodotto-popup.component.css']
})
export class RimuoviProdottoPopupComponent {
  constructor(private agservice : AggiungiAlCarrelloService){}
  get(){
    return this.agservice.getRemove()
  }
}

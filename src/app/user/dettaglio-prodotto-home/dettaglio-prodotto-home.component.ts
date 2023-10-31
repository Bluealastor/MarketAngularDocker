import { Component } from '@angular/core';
import { ProductDTO } from 'src/dto/productdto';
import { ProductService } from 'src/service/product.service';
import { Router } from '@angular/router';
import { CartService } from 'src/service/cart.service';
import { AggiungiAlCarrelloService } from 'src/service/aggiuntacarrelloservice';

@Component({
  selector: 'app-dettaglio-prodotto-home',
  templateUrl: './dettaglio-prodotto-home.component.html',
  styleUrls: ['./dettaglio-prodotto-home.component.css'],
})
export class DettaglioProdottoHomeComponent {
  prodotto: ProductDTO = new ProductDTO();
  id: number;
  cards: ProductDTO[] = [];

  constructor(private service: ProductService, private router: Router,private cart: CartService, private alert: AggiungiAlCarrelloService) {}

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('cardId'));
    this.findProdottoAndCorrelati(this.id);
  }

  findProdottoAndCorrelati(id: number) {
    this.cards = [];
    this.service.read(id).subscribe((prodotto) => {
      this.prodotto = prodotto;
      this.service
        .getAllByTypeFilter(this.prodotto.type.toString())
        .subscribe((prodotto) => {
          this.cards = this.cards.concat(prodotto);
          console.log(this.cards)
        });
    });
  }

  cardID(id:number){
    localStorage.setItem("cardId",JSON.stringify(id));
    this.findProdottoAndCorrelati(id);
  }

  addCart(){
    this.cart.addToCart(this.cards.filter((prodotto) => prodotto.id == this.prodotto.id));

  }

}

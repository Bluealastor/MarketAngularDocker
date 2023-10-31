import { Component,Input, OnInit} from '@angular/core';
import { CartService } from 'src/service/cart.service';
import { ProductDTO } from 'src/dto/productdto';
import { AggiungiAlCarrelloService } from 'src/service/aggiuntacarrelloservice';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()

  data : ProductDTO
  dati: any;

  constructor( private cartService: CartService,private communicationService:AggiungiAlCarrelloService){ }
  ngOnInit(): void {
    console.log(this.data.immagine1)
  }

  cardID(){
    localStorage.setItem("cardId",JSON.stringify(this.data.id));
    console.log(localStorage.getItem('cardId'));
  }

  onAddCart(product: any): void {
    const products = [product];
    this.cartService.addToCart(products);
    console.log(products);
    this.saveToLocalStorage(products);
   this.communicationService.setShowComponent(true);
      // Imposta il timer per nascondere nuovamente il componente dopo 2 secondi
   setTimeout(() => {
    this.communicationService.setShowComponent(false);
      }, 2000);
    }


  saveToLocalStorage(products: any[]): void {
    localStorage.setItem('cartItems', JSON.stringify(products));
  }





}

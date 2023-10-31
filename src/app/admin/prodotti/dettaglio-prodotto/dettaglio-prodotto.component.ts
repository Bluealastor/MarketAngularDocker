import { Component } from '@angular/core';
import { ProductDTO } from 'src/dto/productdto';
import { ProductService } from 'src/service/product.service';

@Component({
  selector: 'app-dettaglio-prodotto',
  templateUrl: './dettaglio-prodotto.component.html',
  styleUrls: ['./dettaglio-prodotto.component.css']
})
export class DettaglioProdottoComponent {

  prodotto : ProductDTO = new ProductDTO;
  id : number;


  constructor(private service: ProductService) { }

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('rowId'));
    this.getProdotto();
  }

  getProdotto() {
    this.service.read(this.id).subscribe((prodotto) => {
      this.prodotto = prodotto;
    });
  }

}

import { Component} from '@angular/core';
import { PrenotazioneDTO } from 'src/dto/prenotazionedto';
import { ProductDTO } from 'src/dto/productdto';
import { PrenotazioneService } from 'src/service/prenotazioneservice';
import { ProductService } from 'src/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {

  prenotazione: PrenotazioneDTO = new PrenotazioneDTO
  id: number;
  products: ProductDTO[] = [];


  constructor(private service: PrenotazioneService, private serviceProdotti: ProductService) {
  }

  ngOnInit() {
    this.id = JSON.parse( localStorage.getItem('PrenotazioneDati'));
    this.findPrenotazioneAndProdotti(this.id);
  }

  findPrenotazioneAndProdotti(id: number){
    this.service.read(id).subscribe((prenotazione) =>{
      this.prenotazione = prenotazione;
      this.prenotazione.acquisti.forEach(product => {
        this.serviceProdotti.read(product.id).subscribe((product) =>{
          this.products = this.products.concat(product);
        });
      });
    });
  }


  back() {
    localStorage.removeItem('PrenotazioneDati');
  }


}

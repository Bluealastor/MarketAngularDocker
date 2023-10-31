import { Component } from '@angular/core';
import { UserDTO } from 'src/dto/userdto';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { NegozioDTO } from 'src/dto/negoziodto';
import { UserService } from 'src/service/user.service';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { NegozioService } from 'src/service/negozio.service';
import { Router } from '@angular/router';
import { ProductDTO } from 'src/dto/productdto';
import { ProductService } from 'src/service/product.service';

@Component({
  selector: 'app-elimina-account',
  templateUrl: './elimina-account.component.html',
  styleUrls: ['./elimina-account.component.css'],
})
export class EliminaAccountComponent {
  user: UserDTO = new UserDTO();
  anagrafica: AnagraficaDTO = new AnagraficaDTO();
  negozio: NegozioDTO = new NegozioDTO();
  prodotto: ProductDTO = new ProductDTO();
  products: ProductDTO[] = [];

  constructor(
    private service: UserService,
    private serviceAnagrafica: AnagraficaService,
    private serviceNegozio: NegozioService,
    private serviceProdotto: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.findAnagrafica(this.user.id);
    this.findNegozioAndProdotti(this.user.id);
  }

  findAnagrafica(userId: number) {
    this.serviceAnagrafica.findByUserId(userId).subscribe((anagrafica) => {
      this.anagrafica = anagrafica;
    });
  }

  findNegozioAndProdotti(id: number) {
    this.serviceNegozio.findByUserId(id).subscribe((negozio) => {
      this.negozio = negozio;
      this.serviceProdotto.getAllById(this.negozio.id).subscribe((product) => {
        this.products = this.products.concat(product);
      });
    });
  }

  delete() {
      this.serviceProdotto.deleteAllByIdNegozio(this.negozio.id).subscribe(() =>{
        this.serviceNegozio.delete(this.negozio.id).subscribe(() => {
          this.serviceAnagrafica.delete(this.anagrafica.id).subscribe(() => {
            this.service.delete(this.user.id).subscribe(() =>this.user);
          });
        });
      });
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}

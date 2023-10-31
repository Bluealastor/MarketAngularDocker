import { Component } from '@angular/core';
import { ProductService } from 'src/service/product.service';
import { RefreshProdottiService } from '../refresh-prodotti.service';
import { SuccessoDialogComponent } from './dialog-successo/successo-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-elimina-prodotto',
  templateUrl: './elimina-prodotto.component.html',
  styleUrls: ['./elimina-prodotto.component.css']
})
export class EliminaProdottoComponent {

  prodottoId : number;

  constructor(private productService: ProductService, private refresh: RefreshProdottiService, private dialog: MatDialog) {}


  ngOnInit() {
    this.prodottoId = JSON.parse(localStorage.getItem('rowId'));
  }

  delete() {
    this.productService.delete(this.prodottoId).subscribe(() => {
      this.refresh.refreshProdotti();
    });
    this.openDialogSuccesso();
  }

  openDialogSuccesso() {
    this.dialog.open(SuccessoDialogComponent);
  }

}

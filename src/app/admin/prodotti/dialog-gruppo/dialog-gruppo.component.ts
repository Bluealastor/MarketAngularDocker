import { Component } from '@angular/core';
import { RefreshProdottiService } from '../refresh-prodotti.service';

@Component({
  selector: 'app-dialog-gruppo',
  templateUrl: './dialog-gruppo.component.html',
  styleUrls: ['./dialog-gruppo.component.css']
})
export class DialogGruppoComponent {


  constructor(private refresh: RefreshProdottiService) {}


  ngOnInit() {

  }

  delete(){
    this.refresh.refreshProdotti();
  }

}

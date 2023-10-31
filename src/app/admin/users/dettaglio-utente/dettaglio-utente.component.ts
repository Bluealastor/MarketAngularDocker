import { Component } from '@angular/core';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { RefreshAnagraficaService } from '../refresh-anagrafica.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEliminaComponent } from '../dialog-elimina/dialog-elimina.component';

@Component({
  selector: 'app-dettaglio-utente',
  templateUrl: './dettaglio-utente.component.html',
  styleUrls: ['./dettaglio-utente.component.css']
})
export class DettaglioUtenteComponent {

  anagrafica : AnagraficaDTO = new AnagraficaDTO;
  rowId : number;

  constructor(private service: AnagraficaService, private refresh: RefreshAnagraficaService, private dialog: MatDialog) { }

  ngOnInit() {
    this.rowId = JSON.parse(localStorage.getItem('rowId'));
    this.readAnagrafica(this.rowId);
  }

  readAnagrafica(anagraficaId:number){
    this.service.read(anagraficaId).subscribe(anagrafica => {this.anagrafica = anagrafica;});
  }

  openDialogElimina(id: number) {
    localStorage.setItem('rowId', JSON.stringify(id));
    this.dialog.open(DialogEliminaComponent);
  }

}

import { Component } from '@angular/core';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessoComponent } from './dialog-successo/dialog-successo.component';
import { RefreshAnagraficaService } from '../refresh-anagrafica.service';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { UserService } from 'src/service/user.service';
import { UserDTO } from 'src/dto/userdto';
import { PrenotazioneService } from 'src/service/prenotazioneservice';

@Component({
  selector: 'app-dialog-elimina',
  templateUrl: './dialog-elimina.component.html',
  styleUrls: ['./dialog-elimina.component.css']
})
export class DialogEliminaComponent {

  user : UserDTO = new UserDTO;
  anagrafica : AnagraficaDTO = new AnagraficaDTO;
  rowId : number;

  constructor(private service: AnagraficaService, private userService : UserService,
    private dialog: MatDialog, private refresh: RefreshAnagraficaService, private prenotazioniService : PrenotazioneService) {}

  ngOnInit() {
    this.rowId = JSON.parse(localStorage.getItem('rowId'));
    this.findAnagrafica(this.rowId);
  }

  findAnagrafica(userId:number){
    this.service.findByUserId(userId).subscribe(anagrafica => {
      this.anagrafica = anagrafica;
      this.user = this.anagrafica.user;
    });
  }

  delete() {
    this.prenotazioniService.deleteAllByIdUser(this.user.id).subscribe(() => {
      this.service.delete(this.rowId).subscribe(() => {
        this.userService.delete(this.user.id).subscribe(() =>{
          this.refresh.refreshAnagrafica();
        })
      })
    });
    this.openDialogSuccesso();
  }

  openDialogSuccesso() {
    this.dialog.open(DialogSuccessoComponent);
  }

}

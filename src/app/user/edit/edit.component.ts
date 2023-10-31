import { Component } from '@angular/core';
import { UserDTO } from 'src/dto/userdto';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { UserService } from 'src/service/user.service';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from 'src/app/admin/profile/profile-dialog/profile-dialog.component';
import { ConfermaPasswordErrataComponent } from 'src/app/admin/profile/conferma-password-errata/conferma-password-errata.component';
import { PopupComponent } from '../popup/popup.component';
import { EditConfirmComponent } from '../edit-confirm/edit-confirm.component';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  popup: PopupComponent;

  anagrafica : AnagraficaDTO = new AnagraficaDTO;
  anag : AnagraficaDTO[];
  user: UserDTO = new UserDTO;
  users : UserDTO[];
  hide = true;
  hide2 = true;
  nomeTEMP : String;
  cognomeTEMP : String;
  confirmPassword : String;

  constructor(private serviceuser: UserService,private service: AnagraficaService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getUsers();
    this.confirmPassword = this.user.password;
    this.findAnagrafica(this.user.id);
    this.hide = false;
    this.hide2 = false;
  }

  openDialog() {
    this.dialog.open(EditConfirmComponent);
  }

  openDialogErrore() {
    this.dialog.open(ConfermaPasswordErrataComponent);
  }

  openPopUp() {
    this.dialog.open(PopupComponent);
  }

  findAnagrafica(userId:number){
    this.service.findByUserId(userId).subscribe(anagrafica => {this.anagrafica = anagrafica;
      this.nomeTEMP = this.anagrafica.nome;this.cognomeTEMP = this.anagrafica.cognome;});
  }

  getUsers() {
    this.serviceuser.getAll().subscribe(users => this.users = users);
  }

  getAnag() {
    this.service.getAll().subscribe(anag => this.anag = anag);
  }

  update(userUPDATE: UserDTO,anagUPDATE: AnagraficaDTO) {
    if(this.confirmPassword !== this.user.password) {this.openDialogErrore();}
    else {
      this.serviceuser.update(userUPDATE).subscribe(() => this.getUsers());
      localStorage.setItem('currentUser', JSON.stringify(userUPDATE));
      this.service.update(anagUPDATE).subscribe(() => this.getAnag());
      this.confirmPassword = this.user.password;
      this.openDialog();
    }

  }



}

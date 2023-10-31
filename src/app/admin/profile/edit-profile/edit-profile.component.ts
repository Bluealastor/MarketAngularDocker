import { Component } from '@angular/core';
import { UserDTO } from 'src/dto/userdto';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { UserService } from 'src/service/user.service';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { ConfermaPasswordErrataComponent } from '../conferma-password-errata/conferma-password-errata.component';
import { EliminaAccountComponent } from '../elimina-account/elimina-account.component';
import { RefreshHeaderService } from '../refresh-header.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  anagrafica: AnagraficaDTO = new AnagraficaDTO();
  user: UserDTO = new UserDTO();
  hide = true;
  hide2 = true;
  nomeTEMP: String;
  cognomeTEMP: String;
  confirmPassword: String;

  constructor(
    private serviceuser: UserService,
    private service: AnagraficaService,
    private dialog: MatDialog,
    private refresh: RefreshHeaderService
  ) {}

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.confirmPassword = this.user.password;
    this.findAnagrafica(this.user.id);
    this.hide = false;
    this.hide2 = false;
  }

  openDialog() {
    this.dialog.open(ProfileDialogComponent);
  }

  openDialogErrore() {
    this.dialog.open(ConfermaPasswordErrataComponent);
  }

  openDialogElimina() {
    this.dialog.open(EliminaAccountComponent);
  }

  findAnagrafica(userId: number) {
    this.service.findByUserId(userId).subscribe((anagrafica) => {
      this.anagrafica = anagrafica;
      this.nomeTEMP = this.anagrafica.nome;
      this.cognomeTEMP = this.anagrafica.cognome;
    });
  }

  update() {
    if (this.confirmPassword !== this.user.password) {
      this.openDialogErrore();
    } else {
      console.log(JSON.stringify(this.user));
      this.serviceuser.update(this.user).subscribe(() => {
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.service.update(this.anagrafica).subscribe(() => {
          this.refresh.refreshHeader();
        });
      });
      this.confirmPassword = this.user.password;
      this.openDialog();
    }
  }
}

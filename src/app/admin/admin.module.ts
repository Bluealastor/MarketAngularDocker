import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { ProfileComponent } from './profile/profile.component';
import {NgFor} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { MaterialModule } from '../material/material.module';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { EditNegozioComponent } from './profile/edit-negozio/edit-negozio.component';
import { NegozioDialogComponent } from './profile/negozio-dialog/negozio-dialog.component';
import { ProfileDialogComponent } from './profile/profile-dialog/profile-dialog.component';
import { ConfermaPasswordErrataComponent } from './profile/conferma-password-errata/conferma-password-errata.component';
import { EliminaAccountComponent } from './profile/elimina-account/elimina-account.component';
import { DettaglioUtenteComponent } from './users/dettaglio-utente/dettaglio-utente.component';
import { DialogEliminaComponent } from './users/dialog-elimina/dialog-elimina.component';
import { DialogSuccessoComponent } from './users/dialog-elimina/dialog-successo/dialog-successo.component';
import { EliminaProdottoComponent } from './prodotti/elimina-prodotto/elimina-prodotto.component';
import { SuccessoDialogComponent } from './prodotti/elimina-prodotto/dialog-successo/successo-dialog.component';
import { DettaglioProdottoComponent } from './prodotti/dettaglio-prodotto/dettaglio-prodotto.component';
import { EditProdottoComponent } from './prodotti/edit-prodotto/edit-prodotto.component';
import { DialogEditComponent } from './prodotti/edit-prodotto/dialog-edit/dialog-edit.component';
import { AggiungiProdottoComponent } from './prodotti/aggiungi-prodotto/aggiungi-prodotto.component';
import { DialogCreateComponent } from './prodotti/aggiungi-prodotto/dialog-create/dialog-create.component';
import { DialogGruppoComponent } from './prodotti/dialog-gruppo/dialog-gruppo.component';
import { GruppoDialogComponent } from './users/gruppo-dialog/gruppo-dialog.component';


/**
 * Modulo dell'admin, qui vengono dichiarate le component che utilizza
 * l'admin. Questo modulo importa AdminRoutingModule.
 *
 * @author Vittorio Valent
 *
 * @see AdminRoutingModule
 */
@NgModule({
  declarations: [
    AdminDashboardComponent,
    UsersComponent,
    WorkInProgressComponent,
    ProfileComponent,
    ProdottiComponent,
    EditProfileComponent,
    EditNegozioComponent,
    NegozioDialogComponent,
    ProfileDialogComponent,
    ConfermaPasswordErrataComponent,
    EliminaAccountComponent,
    DettaglioUtenteComponent,
    DialogEliminaComponent,
    DialogSuccessoComponent,
    EliminaProdottoComponent,
    SuccessoDialogComponent,
    DettaglioProdottoComponent,
    EditProdottoComponent,
    DialogEditComponent,
    AggiungiProdottoComponent,
    DialogCreateComponent,
    DialogGruppoComponent,
    GruppoDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    NgFor,
    BrowserModule,
    MaterialModule
  ]
})
export class AdminModule {}

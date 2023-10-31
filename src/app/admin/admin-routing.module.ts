import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { ProfileComponent } from './profile/profile.component';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { EditNegozioComponent } from './profile/edit-negozio/edit-negozio.component';
import { DettaglioUtenteComponent } from './users/dettaglio-utente/dettaglio-utente.component';
import { DettaglioProdottoComponent } from './prodotti/dettaglio-prodotto/dettaglio-prodotto.component';
import { EditProdottoComponent } from './prodotti/edit-prodotto/edit-prodotto.component';
import { AggiungiProdottoComponent } from './prodotti/aggiungi-prodotto/aggiungi-prodotto.component';

/**
 * Modulo di routing dell'admin. Qui ci sono i percorsi che un admin può seguire:
 * appena fa il login viene caricato nel <router-outlet> di app-component il layout e nel
 * <router-outlet> del layout (come percorsi "children") vengono visualizzati gli altri
 * (qui sotto sono indentati).
 *
 * @author Vittorio Valent
 *
 * @see AdminLayoutComponent
 *
 * @see layout
 */
const routes: Routes = [

  { path: 'admin-dashboard', component: AdminLayoutComponent, children:[
    { path: '', component: AdminDashboardComponent},
    { path: 'users', component: UsersComponent},
    { path: 'work-in-progress', component: WorkInProgressComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'products', component: ProdottiComponent},
    { path: 'editProfile', component: EditProfileComponent},
    { path: 'editNegozio', component: EditNegozioComponent},
    { path: 'dettaglioUtente', component: DettaglioUtenteComponent},
    { path: 'dettaglioProdotto', component: DettaglioProdottoComponent},
    { path: 'editProdotto', component: EditProdottoComponent},
    { path: 'aggiungiProdotto', component: AggiungiProdottoComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

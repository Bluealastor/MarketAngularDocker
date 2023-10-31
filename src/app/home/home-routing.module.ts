import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { HomeComponent } from 'src/app/layout/home/home.component';
import { DettaglioProdottoHomeComponent } from '../user/dettaglio-prodotto-home/dettaglio-prodotto-home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, children:[
  { path: 'dettaglio-prodotto-home', component: DettaglioProdottoHomeComponent},
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

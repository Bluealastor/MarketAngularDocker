import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material/material.module';

import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { PopupAggiungiCarrelloComponent } from './popup-aggiungi-carrello/popup-aggiungi-carrello.component';


import { RimuoviProdottoPopupComponent } from './rimuovi-prodotto-popup/rimuovi-prodotto-popup.component';


@NgModule({
  declarations: [
   CardComponent,HomeDashboardComponent, PopupAggiungiCarrelloComponent],
  imports: [
    FormsModule,
    MaterialModule,
    CommonModule,
    HomeRoutingModule,
    LayoutModule

    ],
  exports: [
    HomeDashboardComponent
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminMenuComponent } from './admin-layout/admin-menu/admin-menu.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import { CartComponent } from './header/cart/cart.component';
import { MaterialModule } from '../material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogDataExampleDialog } from './header/cart/cart.component';

import { HomeComponent } from './home/home.component';
import { HomeModule } from '../home/home.module';

import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CartService } from 'src/service/cart.service';

import { RimuoviProdottoPopupComponent } from './header/cart/rimuovi-prodotto-popup/rimuovi-prodotto-popup.component';
import { AggiungiAlCarrelloService } from 'src/service/aggiuntacarrelloservice';



/**
 * Modulo di layout. Viene caricato nel router outlet padre e poi
 * non viene più ricaricato. Quando clicchiamo su un link ricarichiamo solo l'outlet
 * che sta dentro AdminLayoutComponent
 *
 * @author Vittorio Valent
 *
 * @see AdminLayoutComponent
 */
@NgModule({
  declarations: [

    AdminLayoutComponent,
    AdminMenuComponent,
    HeaderComponent,
    UserLayoutComponent,
    HomeComponent,
    CartComponent,
    DialogDataExampleDialog,
    RimuoviProdottoPopupComponent,

    ],
  imports: [
    SidebarModule,
    ButtonModule,
    DropDownListModule,
    HomeModule,
    MaterialModule,
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    MaterialModule,
    MatDialogModule,

  ],
  providers: [CartService,AggiungiAlCarrelloService]
})
export class LayoutModule {
 }

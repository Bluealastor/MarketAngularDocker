import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { DetailComponent } from './profile/detail/detail.component';
import {MatCardModule} from '@angular/material/card';
import { AquistiComponent } from './profile/aquisti/aquisti.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { EditComponent } from './edit/edit.component';
import { MaterialModule } from '../material/material.module';
import { PopupComponent } from './popup/popup.component';
import { PopupDirective } from './popup/popup.directive';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EditConfirmComponent } from './edit-confirm/edit-confirm.component';
import { HomeModule } from '../home/home.module';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DettaglioProdottoHomeComponent } from './dettaglio-prodotto-home/dettaglio-prodotto-home.component';
import { CardComponent } from '../home/card/card.component';


@NgModule({
  declarations: [
    ProfileComponent,
    DetailComponent,
    AquistiComponent,
    ProductDetailComponent,
    UserDashboardComponent,
    EditComponent,
    PopupComponent,
    PopupDirective,
    EditComponent,
    EditConfirmComponent,
    BuyProductComponent,
    DetailComponent,
    DettaglioProdottoHomeComponent,

  ],
  imports: [
    MatCardModule,
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    MatIconModule,
    HomeModule,
    LayoutModule,
  ],
})
export class UserModule { }

import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLayoutComponent } from '../layout/user-layout/user-layout.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { EditComponent } from './edit/edit.component';
import { DettaglioProdottoHomeComponent } from './dettaglio-prodotto-home/dettaglio-prodotto-home.component';
import { BuyProductComponent } from './buy-product/buy-product.component';

const routes: Routes = [
  { path: 'user', component: UserLayoutComponent, children:[
    {path:'dashboard', component: UserDashboardComponent},
    { path: 'profile', component: ProfileComponent},
    {path: 'aquisti', component: ProductDetailComponent},
    {path: 'product-detail', component: ProductDetailComponent},
    {path: 'concludi-prenotazione',component: BuyProductComponent},
    {path: 'edit', component:EditComponent},
    {path: 'dettaglio-prodotto-home',component:DettaglioProdottoHomeComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

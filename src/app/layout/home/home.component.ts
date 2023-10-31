import { Component } from '@angular/core';
import { ProductType } from 'src/dto/product.type';
import { ProductDTO } from 'src/dto/productdto';
import { ProductService } from 'src/service/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchText:String=" ";
  filterType: ProductType;
  cards: ProductDTO[];
  filterp: ProductDTO[];
  constructor(private service : ProductService ) {}
  bol:boolean
}

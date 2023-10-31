import { Component } from '@angular/core';
import { ProductDTO } from 'src/dto/productdto';
import { ProductService } from 'src/service/product.service';
import { OnInit } from '@angular/core';
import { ProductType } from 'src/dto/product.type';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css'],
})
export class HomeDashboardComponent implements OnInit {
  searchText: String = '';
  filterType: ProductType;
  cards: ProductDTO[] = [];

  constructor(
    private service: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.service.findAll().subscribe({
      next: (product) => {
        this.cards = this.cards.concat(product);
      },
      error: (err) => console.error(err),
      complete: () => console.log(this.cards),
    });
  }

  dofilter(value: any) {
    this.cards = [];
    if (value.value == 'tutto') {
      this.service.findAll().subscribe((product) => {
        this.cards = this.cards.concat(product);
      });
    } else {
      this.service.getAllByTypeFilter(value.value).subscribe((product) => {
        this.cards = this.cards.concat(product);
      });
    }
  }

  changeOrder(value: any) {
    console.log(value);
    if (value.value == 'CRESCENTE') {
      this.service.getAll().subscribe((product) => {
        this.cards = product.sort((a, b) => a.prezzo - b.prezzo);
      });
    } else {
      this.service.getAll().subscribe((product) => {
        this.cards = product.sort((a, b) => b.prezzo - a.prezzo);
      });
    }
  }

  filterOra(value: any) {
    this.cards = [];
    if (value.value == 'tutto') {
      this.service.getAll().subscribe((product) => {
        this.cards = product;
      });
    } else {
      this.service.getAllByOraFilter(value.value).subscribe((product) => {
        this.cards = this.cards.concat(product);
        console.log(this.cards);
      });
    }
  }

  filterItems(): void {
    this.service.getAll().subscribe((product) => {
      this.cards = product;
      console.log(this.searchText);
      this.cards = this.cards.filter((item) =>
        item.nome.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
  }
}

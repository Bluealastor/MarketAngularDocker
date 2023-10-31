import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { UserDTO } from 'src/dto/userdto';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDTO } from 'src/dto/productdto';
import { ProductService } from 'src/service/product.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, count } from 'rxjs';
import { EliminaProdottoComponent } from './elimina-prodotto/elimina-prodotto.component';
import { RefreshProdottiService } from './refresh-prodotti.service';
import { NegozioDTO } from 'src/dto/negoziodto';
import { NegozioService } from 'src/service/negozio.service';
import { Chart } from 'chart.js/auto';
import { PrenotazioneDTO } from 'src/dto/prenotazionedto';
import { PrenotazioneService } from 'src/service/prenotazioneservice';
import { DialogGruppoComponent } from './dialog-gruppo/dialog-gruppo.component';

export interface TuttiGliUtenti {
  nome: string;
  tipologia: string;
  prezzo: string;
  orari: string;
  icone: string;
}

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css'],
})
export class ProdottiComponent implements OnInit, AfterViewInit {
  sortedData: ProductDTO[];
  files: File;
  user: UserDTO = new UserDTO();
  product: ProductDTO = new ProductDTO();
  products: ProductDTO[] = [];
  negozio: NegozioDTO = new NegozioDTO();
  prenotazioni: PrenotazioneDTO[] = [];
  prenotazioneToDelete : PrenotazioneDTO[] = [];
  alimentari: ProductDTO[] = [];
  cancelleria: ProductDTO[] = [];
  lengthAlimentari: number;
  lengthCancelleria: number;
  lengthProdotti: number;
  prodottiVenduti: number = 0;
  idPreno: number;
  giornoPrece: string;
  giornoPreno: string;
  days: any[];
  data: any[];
  isDisabled: boolean = true;
  gruppo: [] = [];

  displayedColumns: string[] = [
    'select',
    'nome',
    'tipologia',
    'prezzo',
    'orari',
    'icone',
  ];

  dataSource = new MatTableDataSource<ProductDTO>([]);
  selection = new SelectionModel<any>(true, []);

  constructor(
    private service: UserService,
    private productService: ProductService,
    private negozioService: NegozioService,
    private prenotazioneService: PrenotazioneService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private refresh: RefreshProdottiService
  ) {
    this.sortedData = this.dataSource.data.slice();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.findNegozioAndProdotti(this.user.id);
    this.dataSource.sort = this.sort;

    this.refresh.refreshProdotti$.subscribe(() => {
      console.log('STO AGGIORNANDO LA LISTA');
      this.products = [];
      this.findNegozioAndProdotti(this.user.id);
    });

    console.log('CREAZIONE CHART');
    this.createChartDonut();
    this.createChartLine();
  }

  applica(event: any) {
    if (event.value === 'DELETE') {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  azioneDiGruppo(){
    this.selection.selected.forEach(product => {
      this.prenotazioneService.deleteAllByIdProduct(product.id).subscribe(() =>{
        this.productService.delete(product.id).subscribe(() =>{
        });
      });
    });
    this.openDialogAzioneDiGruppo();
  }

  openDialogAzioneDiGruppo() {
    this.dialog.open(DialogGruppoComponent);
  }

  findNegozioAndProdotti(id: number) {
    this.negozioService.findByUserId(id).subscribe((negozio) => {
      this.negozio = negozio;
      this.productService.getAllById(this.negozio.id).subscribe((product) => {
        this.products = this.products.concat(product);
        this.dataSource.data = this.products;
        this.lengthProdotti = this.products.length;
      });
    });
  }

  createChartDonut() {
    this.negozioService.findByUserId(this.user.id).subscribe((negozio) => {
      this.negozio = negozio;
      this.productService
        .getAllByType(this.negozio.id, 'ALIMENTARI')
        .subscribe((products) => {
          this.alimentari = this.alimentari.concat(products);
          this.lengthAlimentari = this.alimentari.length;

          this.productService
            .getAllByType(this.negozio.id, 'CANCELLERIA')
            .subscribe((products) => {
              this.cancelleria = this.cancelleria.concat(products);
              this.lengthCancelleria = this.cancelleria.length;

              const myChart = new Chart('myChart', {
                type: 'doughnut',
                data: {
                  labels: ['ALIMENTARI', 'CANCELLERIA'],
                  datasets: [
                    {
                      label: 'Prodotti',
                      data: [this.lengthAlimentari, this.lengthCancelleria],
                      backgroundColor: [
                        'rgb(153, 0, 255)',
                        'rgb(204, 153, 255)',
                      ],
                      hoverOffset: 4,
                    },
                  ],
                },

                options: {
                  radius: 75,
                  cutout: 65,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                },
              });
            });
        });
    });
  }

  createChartLine() {
    const DAYS = Array.from({ length: 30 }, (_, index) => `${index + 1}`);
    const DATA = Array.from({ length: 30 }, () => 0);

    this.prenotazioneService.findAll().subscribe((prenotazioni) => {
      this.prenotazioni = this.prenotazioni.concat(prenotazioni);

      this.prenotazioni.forEach((prenotazione) => {
        this.idPreno = prenotazione.id;
        this.giornoPrece = this.prenotazioni[0].giornoPrenotazione
          .toString()
          .slice(8, 10);

        prenotazione.acquisti = prenotazione.acquisti.filter((acquisto) => {
          prenotazione.id === this.idPreno;
          this.giornoPreno = prenotazione.giornoPrenotazione
            .toString()
            .slice(8, 10);

          if (this.giornoPreno !== this.giornoPrece) {
            this.prodottiVenduti = 0;
          }

          this.prodottiVenduti += 1;

          DATA[parseInt(this.giornoPreno) - 1] = this.prodottiVenduti;

          this.giornoPrece = this.giornoPreno;
        });

        this.creaChartLine(DAYS, DATA);
      });
    });
  }

  creaChartLine(days, data) {
    const existingChart = Chart.getChart('myChartLine');
    if (existingChart) {
      existingChart.destroy();
    }

    const myChartLine = new Chart('myChartLine', {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Vendite',
            data: data,
            backgroundColor: ['rgb(255, 255, 204)', 'rgb(255, 204, 0)'],
            borderColor: ['rgb(255, 204, 0)'],
            borderWidth: 2,
            pointStyle: 'circle',
            pointBackgroundColor: ['white'],
            fill: true,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {},
          y: {
            max: 100,
            beginAtZero: true,
            ticks: {
              stepSize: 25,
            },
          },
        },
      },
    });


  }
  findNegozio(userId: number) {
    this.negozioService.findByUserId(userId).subscribe((negozio) => {
      this.negozio = negozio;
    });
  }

  getProdotti() {
    this.productService.getAll().subscribe((products) => {
      console.log(products)
      this.products = products.filter(
        (prodotto) => prodotto.negozio && prodotto.negozio.id === this.negozio.id
      );
      this.dataSource.data = this.products;
      this.lengthProdotti = this.products.length;
      console.log(this.products);
    });
  }


  getRowId(id: number) {
    localStorage.setItem('rowId', JSON.stringify(id));
  }

  openDialogElimina(id: number) {
    localStorage.setItem('rowId', JSON.stringify(id));
    this.dialog.open(EliminaProdottoComponent);
  }

  /** IMPAGINATOR, SORTER */

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** CHECKBOX TOGGLE */

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** SORTING TABLE */

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nome':
          return compare(a.nome, b.nome, isAsc);
        case 'tipologia':
          return compare(a.type, b.type, isAsc);
        case 'prezzo':
          return compare(a.prezzo, b.prezzo, isAsc);
        case 'orari':
          return compare(a.orariDisponibili, b.orariDisponibili, isAsc);
        default:
          return 0;
      }
    });
  }
}

  function compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

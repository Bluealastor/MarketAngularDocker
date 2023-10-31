import { Component, OnInit } from '@angular/core';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { AnagraficaService } from 'src/service/anagrafica.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogEliminaComponent } from './dialog-elimina/dialog-elimina.component';
import { RefreshAnagraficaService } from './refresh-anagrafica.service';
import { Subscription } from 'rxjs';
import { PrenotazioneService } from 'src/service/prenotazioneservice';
import { UserService } from 'src/service/user.service';
import { GruppoDialogComponent } from './gruppo-dialog/gruppo-dialog.component';


export interface TuttiGliUtenti {
  nome: string;
  mail: string;
  genere: string;
  data: string;
  icone: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  sortedData: AnagraficaDTO[];

  anagrafica: AnagraficaDTO = new AnagraficaDTO();
  anagraficaList: AnagraficaDTO[] = [];
  arrow: boolean = false;

  isDisabled: boolean = true;
  gruppo: [] = [];

  displayedColumns: string[] = [
    'select',
    'nome',
    'mail',
    'genere',
    'data',
    'icone',
  ];
  dataSource = new MatTableDataSource<AnagraficaDTO>([]);
  selection = new SelectionModel<any>(true, []);

  constructor(
    private anagService: AnagraficaService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private prenotazioneService: PrenotazioneService,
    private userService: UserService,
    private refresh: RefreshAnagraficaService
  ) {
    this.sortedData = this.dataSource.data.slice();
  }

  ngOnInit() {
    this.getAnagrafica();
    this.dataSource.sort = this.sort;

    this.refresh.refreshAnagrafica$.subscribe(() => {
      console.log('STO AGGIORNANDO LA LISTA');
      this.anagraficaList = [];
      this.getAnagrafica();
    });
  }

  applica(event: any) {
    if (event.value === 'DELETE') {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  azioneDiGruppo() {
    this.selection.selected.forEach((anagrafica) => {
      const id = anagrafica.user.id;
      this.prenotazioneService.deleteAllByIdUser(id).subscribe(() => {
        this.anagService.delete(anagrafica.id).subscribe(() => {
          this.userService.delete(id).subscribe(() => {});
        });
      });
    });
    this.openDialogAzioneDiGruppo();
  }

  openDialogAzioneDiGruppo(){
    this.dialog.open(GruppoDialogComponent);
  }

  changeArrow() {
    this.arrow = !this.arrow;
  }

  getAnagrafica() {
    this.anagService.findAll().subscribe((anag) => {
      this.anagraficaList = this.anagraficaList.concat(anag);
      this.dataSource.data = this.anagraficaList;
    });
  }

  getRowId(id: number) {
    localStorage.setItem('rowId', JSON.stringify(id));
  }

  openDialogElimina(id: number) {
    localStorage.setItem('rowId', JSON.stringify(id));
    this.dialog.open(DialogEliminaComponent);
  }

  /********************************
   *                              *
   *        IMPAGINATOR           *
   *                              *
   ********************************/

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /********************************
   *                              *
   *      CHECKBOX TOGGLE         *
   *                              *
   ********************************/

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
        case 'mail':
          return compare(a.email, b.email, isAsc);
        case 'genere':
          return compare(a.sesso, b.sesso, isAsc);
        case 'data':
          return compare(a.dataNascita, b.dataNascita, isAsc);
        default:
          return 0;
      }
    });
  }
}

  function compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


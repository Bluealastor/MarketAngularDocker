import { Component } from '@angular/core';
import { PrenotazioneDTO } from 'src/dto/prenotazionedto';
import { UserDTO } from 'src/dto/userdto';
import { PrenotazioneService } from 'src/service/prenotazioneservice';

@Component({
  selector: 'app-aquisti',
  templateUrl: './aquisti.component.html',
  styleUrls: ['./aquisti.component.css']
})
export class AquistiComponent {
  user: UserDTO = new UserDTO;
  prenotazioni: PrenotazioneDTO[] = [];
  orderBy: 'asc' | 'desc' = 'asc';
  currentSortField: 'id' | 'giornoPrenotazione' | 'totale';

  constructor(private service: PrenotazioneService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.findPrenotazioni();
  }

  findPrenotazioni() {
    this.service.getAllById(this.user.id).subscribe(prenotazioni => {
      this.prenotazioni = this.prenotazioni.concat(prenotazioni);
    });
  }

  saveDataToLocalStorage(id: number): void {
    localStorage.setItem('PrenotazioneDati', JSON.stringify(id));
  }

  sortProducts(sortField: 'id' | 'giornoPrenotazione' | 'totale') {
    if (this.currentSortField === sortField) {
      this.orderBy = this.orderBy === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderBy = 'asc';
      this.currentSortField = sortField;
    }

    this.prenotazioni.sort((a, b) => {
      const valueA = this.getFieldValue(a, sortField);
      const valueB = this.getFieldValue(b, sortField);

      if (valueA < valueB) {
        // Ordine ascendente
        return this.orderBy === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        // Ordine discendente
        return this.orderBy === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  getFieldValue(prenotazione: PrenotazioneDTO, field: 'id' | 'giornoPrenotazione' | 'totale'): any {
    switch (field) {
      case 'id':
        return prenotazione.id;
      case 'giornoPrenotazione':
        return new Date(prenotazione.giornoPrenotazione);
      case 'totale':
        return prenotazione.totale;
      default:
        return null;
    }
  }
}

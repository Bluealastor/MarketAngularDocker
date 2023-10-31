import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshAnagraficaService {
  private refreshAnagraficaSource = new Subject<void>();
  refreshAnagrafica$: Observable<void> = this.refreshAnagraficaSource.asObservable();


  constructor() { }

  refreshAnagrafica() {
    this.refreshAnagraficaSource.next();
  }


}

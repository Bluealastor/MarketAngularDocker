import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshProdottiService {
  private refreshProdottiSource = new Subject<void>();
  refreshProdotti$: Observable<void> = this.refreshProdottiSource.asObservable();


  constructor() { }

  refreshProdotti() {
    this.refreshProdottiSource.next();
  }

}

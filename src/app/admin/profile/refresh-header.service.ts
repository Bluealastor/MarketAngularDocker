import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshHeaderService {
  private refreshHeaderSource = new Subject<void>();
  refreshHeader$: Observable<void> = this.refreshHeaderSource.asObservable();


  constructor() { }

  refreshHeader() {
    this.refreshHeaderSource.next();
  }

}

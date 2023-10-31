import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AggiungiAlCarrelloService {
  private showComponent = false;
  public showRemove= false;

  setShowComponent(value: boolean) {
    this.showComponent = value;
  }

  getShowComponent() {
    return this.showComponent;
  }
  clickRemove(){
    this.showRemove=true;
    // Imposta il timer per nascondere nuovamente il componente dopo 2 secondi
    setTimeout(() => {
      this.showRemove=false;
    }, 2000);
  }
  
  getRemove(){
    return this.showRemove;
  }
}
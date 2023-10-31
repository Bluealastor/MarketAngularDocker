import { Component } from '@angular/core';
import { RefreshAnagraficaService } from '../refresh-anagrafica.service';

@Component({
  selector: 'app-gruppo-dialog',
  templateUrl: './gruppo-dialog.component.html',
  styleUrls: ['./gruppo-dialog.component.css']
})
export class GruppoDialogComponent {


  constructor(private refresh: RefreshAnagraficaService) {}


  ngOnInit() {

  }

  delete(){
    this.refresh.refreshAnagrafica();
  }
}

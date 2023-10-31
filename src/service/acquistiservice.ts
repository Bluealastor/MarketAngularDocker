import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { AcquistiDTO } from 'src/dto/acquistidto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { PrenotazioneDTO } from 'src/dto/prenotazionedto';



@Injectable({
  providedIn: 'root'
})

export class AcquistiService extends AbstractService<AcquistiDTO>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'acquisto';
  }

  findByPrenotazioneId(prenotazioneId: number): Observable<PrenotazioneDTO> {
    return this.http.get<PrenotazioneDTO>(environment.APIEndpoint + this.type + '/findAcquisti?id='+ prenotazioneId);
  }

}

import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { PrenotazioneDTO } from 'src/dto/prenotazionedto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PrenotazioneService extends AbstractService<PrenotazioneDTO>{
  
  constructor(http: HttpClient) {
    super(http);
    this.type = 'micro2/prenotazione';
  }

  read(id: number): Observable<PrenotazioneDTO> {
    return this.http.get<PrenotazioneDTO>(environment.APIEndpoint + this.type + '/findById?id='+ id);
  }

  insert(prenotazioneToInsert: PrenotazioneDTO): Observable<any> {
    return this.http.put<any>(environment.APIEndpoint + this.type + '/insert', prenotazioneToInsert);
  }

  deleteAllByIdUser(id: number): Observable<any> {
    return this.http.delete<any>(environment.APIEndpoint + this.type + '/deleteAllById?id=' + id);
  }

  deleteAllByIdProduct(id: number): Observable<any> {
    return this.http.delete<any>(environment.APIEndpoint + this.type + '/deleteAllByIdProduct?id=' + id);
  }

  findAll(): Observable<PrenotazioneDTO> {
    return this.http.get<PrenotazioneDTO>(environment.APIEndpoint + this.type + '/findAll');
  }

  getAllById(id: number): Observable<PrenotazioneDTO> {
    return this.http.get<PrenotazioneDTO>(environment.APIEndpoint + this.type + '/findAllById?id='+ id);
  }

  getAllByIdProduct(id: number): Observable<PrenotazioneDTO> {
    return this.http.get<PrenotazioneDTO>(environment.APIEndpoint + this.type + '/findAllByIdProduct?id='+ id);
  }

}

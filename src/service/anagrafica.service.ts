import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AnagraficaService extends AbstractService<AnagraficaDTO>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'micro2/anagrafica';
  }

  read(id: number): Observable<AnagraficaDTO> {
    return this.http.get<AnagraficaDTO>(environment.APIEndpoint + this.type + '/findById?id='+ id);
  }

  update(updatedAnagrafica: AnagraficaDTO): Observable<any> {
    return this.http.put<any>(environment.APIEndpoint + this.type + '/update', updatedAnagrafica);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.APIEndpoint + this.type + '/deleteById?id=' + id);
  }

  findAll(): Observable<AnagraficaDTO> {
    return this.http.get<AnagraficaDTO>(environment.APIEndpoint + this.type + '/findAll');
  }

  findByUserId(userId: number): Observable<AnagraficaDTO> {
    return this.http.get<AnagraficaDTO>(environment.APIEndpoint + this.type + '/findUtente?id='+ userId);
  }

}

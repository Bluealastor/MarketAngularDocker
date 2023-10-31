import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { NegozioDTO } from 'src/dto/negoziodto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class NegozioService extends AbstractService<NegozioDTO>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'micro2/negozio';
  }

  update(updatedNegozio: NegozioDTO): Observable<any> {
    return this.http.put<any>(environment.APIEndpoint + this.type + '/update', updatedNegozio);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.APIEndpoint + this.type + '/deleteById?id=' + id);
  }

  findByUserId(userId: number): Observable<NegozioDTO> {
    return this.http.get<NegozioDTO>(environment.APIEndpoint + this.type + '/findUtente?id='+ userId);
  }

}

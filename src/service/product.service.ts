import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { ProductDTO } from 'src/dto/productdto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { UserDTO } from 'src/dto/userdto';

@Injectable({
  providedIn: 'root'
})

export class ProductService extends AbstractService<ProductDTO>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'micro2/prodotti';
  }

  read(id: number): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(environment.APIEndpoint + this.type + '/findById?id='+ id);
  }

  update(updatedProduct: ProductDTO): Observable<any> {
    return this.http.put<any>(environment.APIEndpoint + this.type + '/update', updatedProduct);
  }

  insert(productToInsert: ProductDTO): Observable<any> {
    return this.http.put<any>(environment.APIEndpoint + this.type + '/insert', productToInsert);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.APIEndpoint + this.type + '/deleteById?id=' + id);
  }

  deleteAllByIdNegozio(id: number): Observable<any> {
    return this.http.delete<any>(environment.APIEndpoint + this.type + '/deleteAllById?id=' + id);
  }

  findAll(): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(environment.APIEndpoint + this.type + '/findAll');
  }

  getAll(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(environment.APIEndpoint + this.type + '/getAll');
  }

  getAllById(id: number): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(environment.APIEndpoint + this.type + '/findAllById?id='+ id);
  }

  getAllByType(id : number,type: String): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(environment.APIEndpoint + this.type + '/findAllByType?id='+id+'&type='+ type);
  }

  getAllByTypeFilter(type: String): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(environment.APIEndpoint + this.type + '/findAllByTypeFilter?type='+ type);
  }

  getAllByOraFilter(ora: String): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(environment.APIEndpoint + this.type + '/findAllByOraFilter?ora='+ ora);
  }

}

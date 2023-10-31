import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { UserDTO } from 'src/dto/userdto';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from 'src/dto/logindto';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { ObserversModule } from '@angular/cdk/observers';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { RegisterDTO } from 'src/dto/registerdto';

/**
 * I service sono decorati da @Injectable.
 * Qui trovate, oltre ai metodi ereditati dall'Abstract,
 *  il metodo per il login (in mirror con il backend).
 *
 * @author Vittorio Valent
 *
 * @see AbstractService
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<UserDTO>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'micro2/user';
  }

  login(loginDTO: LoginDTO): Observable<UserDTO> {
    console.log("entrato")
    return this.http.post<any>(environment.APIEndpoint +"micro1/user" +  '/login', loginDTO)
  }

  register(dto: RegisterDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(environment.APIEndpoint  + "micro1/user" + '/register', dto);
  }

  update(updatedUser: UserDTO): Observable<any> {
    return this.http.put<any>(environment.APIEndpoint + this.type + '/update', updatedUser);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.APIEndpoint + this.type + '/deleteById?id=' + id);
  }

  findByEmailAndPassword(email: String, password: String): Observable<UserDTO>{
  return this.http.get<UserDTO>(environment.APIEndpoint + this.type + '/findUser',)
  }


}

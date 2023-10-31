import { DatePipe } from '@angular/common';
import {Usertype} from './usertype';

/**
 * Classe DTO di User. DEVE essere uguale (stesso nome classe, stessi attributi e stessi nomi) a
 * quello nel backend.
 *
 * @see Usertype
 *
 * @author Vittorio Valent
 */
export class UserDTO {

   id: number;

   email: String;

   password: String;

   usertype: Usertype;

   dataCreazione: Date;

   token: string;

}


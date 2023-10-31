import { UserDTO } from "./userdto";


export class NegozioDTO {
    id:number;

    nome:String;

    indirizzo:String;

    citta:String;

    nazione:String;

    provincia:String;

    descrizione:String;

    user:UserDTO;
}

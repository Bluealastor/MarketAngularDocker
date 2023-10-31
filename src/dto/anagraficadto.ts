import { UserDTO } from "./userdto";
import { sesso } from "./anagrafica.sesso";

export class AnagraficaDTO {

  id: number;

  nome: string;

  cognome: String;

  email: String;

  indirizzo: String;

  provincia: String;

  nazione: String;

  dataNascita: Date;

  citta: String;

  user: UserDTO;

  sesso: sesso;
  
}

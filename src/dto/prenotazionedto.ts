import { ProductDTO } from "./productdto";
import { UserDTO } from "./userdto";

export class PrenotazioneDTO {
  filter(arg0: (prenotazione: any) => boolean): PrenotazioneDTO[] {
    throw new Error('Method not implemented.');
  }

  id: number;

  user: UserDTO;

  giornoPrenotazione: Date;

  totale: number;
  
  acquisti : ProductDTO[];

}

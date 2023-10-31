import { ProductType } from './product.type';
import { NegozioDTO } from './negoziodto';

export class ProductDTO {

  id:number;

  nome: String;

  descrizione: String;

  type: ProductType;

  orariDisponibili : number;

  prezzo:number;

  negozio:NegozioDTO;
   immagine1: String;
   immagine2: String;
  immagine3 :String ;
   immagine4 :String;
   immagine5 :String ;
}

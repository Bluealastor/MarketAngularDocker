import { UserDTO } from 'src/dto/userdto';
import { ProductDTO } from 'src/dto/productdto';
import { ProductService } from 'src/service/product.service';
import { NegozioDTO } from 'src/dto/negoziodto';
import { NegozioService } from 'src/service/negozio.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateComponent } from './dialog-create/dialog-create.component';
import { Component, OnInit, HostListener } from "@angular/core";
import { ImageService } from 'src/service/imageservice';
import { ImageDTO } from 'src/dto/imagedto';

@Component({
  selector: 'app-aggiungi-prodotto',
  templateUrl: './aggiungi-prodotto.component.html',
  styleUrls: ['./aggiungi-prodotto.component.css']
})
export class AggiungiProdottoComponent implements OnInit{
  file:File;
  immagine:ImageDTO=new ImageDTO
  user : UserDTO = new UserDTO;
  negozio : NegozioDTO = new NegozioDTO;
  prodotto : ProductDTO = new ProductDTO;
  prodotti : ProductDTO[] = [];
  lastProdotto : ProductDTO = new ProductDTO;
  fakeId : number = 0;
  imgUrl:Promise<string>
  previewUrl:String

  constructor(private iService:ImageService,private service : ProductService, private dialog : MatDialog, private negozioService : NegozioService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.findNegozioAndProdotti(this.user.id);
    this.prodotto.prezzo = 0;
    this.dragAreaClass = "dragarea";
  }

  findNegozioAndProdotti(id: number) {
    this.negozioService.findByUserId(id).subscribe((negozio) => {
      this.negozio = negozio;
      this.prodotto.negozio = negozio;
      this.service.getAllById(this.negozio.id).subscribe((product) => {
        this.prodotti = this.prodotti.concat(product);
        this.lastProdotto = this.prodotti[this.prodotti.length-1];
        this.fakeId = this.lastProdotto.id+1;
      });
    });
  }

  async insert() {
    this.service.insert(this.prodotto).subscribe(async (prodotto) => {
    });
   this.openDialogCreate();
  }

  openDialogCreate() {
    this.dialog.open(DialogCreateComponent);
  }
  error: string;
  dragAreaClass: string;
  onFileSelected(event: any): void {
    this.file
    const file: File = event.target.files[0];
    if (file) {
      this.file=file;
      const reader = new FileReader();
          reader.onload = () => {
            this.previewUrl =  reader.result as string;
          };

          reader.readAsDataURL(file);
          this.saveFiles(file)
        }
  }
   async saveFiles(files: File) {

    if (files.length > 1) this.error = "Only one file at time allow";
    else {
      this.error = "";
     (this.iService.uploadImage(files)).then((imgUrl) =>{
          this.prodotto.immagine1=imgUrl.trim()
     })
     console.log(this.prodotto)
    }

}
}

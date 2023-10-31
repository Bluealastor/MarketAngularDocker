import { Component } from '@angular/core';
import { ProductDTO } from 'src/dto/productdto';
import { ProductService } from 'src/service/product.service';
import { RefreshProdottiService } from '../refresh-prodotti.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import { EliminaProdottoComponent } from '../elimina-prodotto/elimina-prodotto.component';
import { HostListener } from '@angular/core';
import { ImageService } from 'src/service/imageservice';

@Component({
  selector: 'app-edit-prodotto',
  templateUrl: './edit-prodotto.component.html',
  styleUrls: ['./edit-prodotto.component.css'],
})
export class EditProdottoComponent {
  file: File;
  prodotto: ProductDTO = new ProductDTO();
  id: number;
  codice: string = '#00000000';
  error: string;
  profiloUrl: string;
  i: number = 0;
  previewUrl: String[] = [' ', ' ', ' ', ' '];
  imgb: boolean[] = [false, false, false, false];
  fil: File[] = [];

  constructor(
    private iService: ImageService,
    private service: ProductService,
    private refresh: RefreshProdottiService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('rowId'));
    this.getProdotto();
  }

  onDelete() {
    this.prodotto.immagine1 = null;
  }

  onEdit(event: any) {
    console.log('entrato');
    this.file;

    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.profiloUrl = reader.result as string;
        this.profiloUrl = this.profiloUrl.trim();
      };

      reader.readAsDataURL(file);
      this.saveFiles(file);
    }
  }

  onEdit4(event: any) {
    console.log('sono dentro onEdit4');
    this.file;
    let j: number = 0;
    const files: File[] = event.target.files;
    console.log(files + 'files');
    for (let file of files) {
      if (file) {
        this.fil.push(file);
        this.file = file;
        console.log(this.fil);
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl[j] = reader.result as string;
        };

        reader.readAsDataURL(file);
        this.saveFiles4(files);
        j++;
      }
    }
  }

  async saveFiles(files: File) {
    if (files.length > 1) this.error = 'Only one file at time allow';
    else {
      this.error = '';
      this.iService.uploadImage(files).then(async (imgUrl) => {
        this.prodotto.immagine1 = imgUrl.trim();
        this.profiloUrl = imgUrl.trim();
      });
      console.log('sono alla fine di save files');
      console.log(this.prodotto.immagine1);
    }
  }

  async saveFiles4(files: File[]) {
    console.log('sono dentro saveFiles4');

    if (files.length > 10) this.error = 'Only one file at time allow';
    else {
      let j: number;
      for (let file of files) {
        this.error = '';
        this.iService.uploadImage(file).then((imgUrl) => {
          console.log(imgUrl);
          this.save(imgUrl);
        });
        console.log(this.prodotto);
      }
    }
  }

  save(url: String) {
    console.log('sono entrato');
    switch (this.i) {
      case 0:
        this.prodotto.immagine2 = url.trimStart();
        this.prodotto.immagine2 = this.prodotto.immagine2.trim();
        break;
      case 1:
        this.prodotto.immagine3 = url.trimStart();
        this.prodotto.immagine2 = this.prodotto.immagine2.trim();
        break;
      case 2:
        this.prodotto.immagine4 = url.trimStart();
        this.prodotto.immagine2 = this.prodotto.immagine2.trim();
        break;
      case 3:
        this.prodotto.immagine5 = url.trimStart();
        this.prodotto.immagine2 = this.prodotto.immagine2.trim();
        break;
    }
    this.i++;
  }

  imgbool(i: number) {
    if (this.previewUrl[i] != null) {
      this.imgb[i] = true;
    } else {
      this.imgb[i] = false;
    }
  }

  getProdotto() {
    this.service.read(this.id).subscribe((prodotto) => {
      this.prodotto = prodotto;
    });
  }

  delete() {
    this.dialog.open(EliminaProdottoComponent);
  }

  update() {
    this.service.update(this.prodotto).subscribe(() => {
      this.refresh.refreshProdotti();
    });
    this.openDialogSuccesso();
  }

  openDialogSuccesso() {
    this.dialog.open(DialogEditComponent);
  }
}

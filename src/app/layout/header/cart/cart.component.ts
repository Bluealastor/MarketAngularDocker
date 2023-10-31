import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, _closeDialogVia } from '@angular/material/dialog';
import { CartService } from '../../../../service/cart.service';
import { DatePipe } from '@angular/common';
import { AcquistiDTO } from 'src/dto/acquistidto';
import { PrenotazioneDTO } from 'src/dto/prenotazionedto';
import { UserDTO } from 'src/dto/userdto';
import { AcquistiService } from 'src/service/acquistiservice';
import { PrenotazioneService } from 'src/service/prenotazioneservice';
import { Data, Router } from '@angular/router';
import { AggiungiAlCarrelloService } from 'src/service/aggiuntacarrelloservice';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  [x: string]: any;
  cartItems: any[] = [];
  dati: any;
  dialogRef: MatDialogRef<DialogDataExampleDialog> | undefined;
  prenotazione:PrenotazioneDTO=new PrenotazioneDTO;
  dat:Data
  badge:number=0;
  constructor(private agservice:AggiungiAlCarrelloService,public dialog: MatDialog, private cartService: CartService,private pservice:PrenotazioneService,private aservice:AcquistiService) {}
  ngOnInit() {
    this.retrieveData();
    console.log("carrello", this.cartItems)
    this.totCarrello();
  }

  openDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
   
    const totale = this.totCarrello();
    this.dialogRef = this.dialog.open(DialogDataExampleDialog, { 
      height: '94.5%',
      width: '23.5%',
      position: {
        right: '0px',
        bottom: '0px',
      },
      data: {
        cartItems: this.cartItems,
        removeFromCart: this.removeFromCart,
        totale: totale,
        dialog:this.dialogRef
      },

    });
    this.totCarrello()
  }

  closeDialog(){
    this.dialogRef.close();
  }


  retrieveData(): void {
    this.cartItems = this.cartService.getCartItems();

  }

  totCarrello() {
    let totale: number = 0;
    for (let prod of this.cartService.getCartItems()) {
      totale = prod.prezzo + totale;
    }
    this.prenotazione.totale = totale;
    console.log("prezzo totale",this.prenotazione.totale)
    return totale; 
  }
  

  removeFromCart = (id: number): void => {
    this.agservice.clickRemove();
    const index = this.cartItems.findIndex(item => item.id === id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      const newTotal = this.totCarrello();

      if (this.dialogRef) {
        this.dialogRef.componentInstance.cartItems = this.cartItems; //aggiorna gli elementi nel carrello
        this.dialogRef.componentInstance.data.totale = newTotal;  // aggiorna il prezzo tot nel carrello
      }
    }
  }
}



@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: './cart-dialog/cart-dialog.html',
  styleUrls: ['./cart.component.css'],
  providers: [DatePipe]
})
export class DialogDataExampleDialog {
  cartItems: any[];
  prenotazione:PrenotazioneDTO=new PrenotazioneDTO;
  acquisti:AcquistiDTO=new AcquistiDTO;
  oggi:Date;
  datePipe: any;
  constructor(private router:Router,@Inject(MAT_DIALOG_DATA) public data: any, private cartService: CartService,private pservice:PrenotazioneService,private aservice:AcquistiService) {
    this.cartItems = data.cartItems;
    this.oggi=new Date()
    console.log(this.oggi)
  }
  buy(){
    let user:UserDTO
    let totale:number=0;
    for(let prod of this.cartItems){
      totale=prod.prezzo+totale;
    }
    this.prenotazione.totale=totale
    this.prenotazione.giornoPrenotazione=this.oggi
    this.prenotazione.user=JSON.parse(localStorage.getItem("currentUser"))
    this.prenotazione.acquisti=this.cartItems
    this.pservice.insert(this.prenotazione).subscribe((p)=>{
      user=(JSON.parse(localStorage.getItem("currentUser")))
      this.pservice.read(user.id).subscribe((preno)=>{
        for(let n of [preno]){
          if(n.giornoPrenotazione==n.giornoPrenotazione&&totale==n.totale){
            this.prenotazione=n;
            console.log(this.prenotazione)
          }
        }
      })
    })
      this.cartItems=[]
      this.data.cartItems=[]
      this.cartService.clearCart();
      localStorage.setItem("cartItems",JSON.stringify(this.cartItems))
      if(this.cartService.getCartItems()==null){

      }else{
        this.router.navigateByUrl("user/concludi-prenotazione")
      }
      
  }

}

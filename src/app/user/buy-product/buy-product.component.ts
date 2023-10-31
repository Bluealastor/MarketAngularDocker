import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrenotazioneDTO } from 'src/dto/prenotazionedto';
import { UserDTO } from 'src/dto/userdto';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { PrenotazioneService } from 'src/service/prenotazioneservice';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {
  user: UserDTO;
  prenotazioni: PrenotazioneDTO[]=[];
  prenotazione:PrenotazioneDTO=new PrenotazioneDTO;
  constructor(private ascervice:AnagraficaService,private router: Router,private service: PrenotazioneService) { }
  ngOnInit(){
    setTimeout(() => {
      console.log("si PArteeee")
      this.router.navigate(['/home']); 
    }, 10000); 

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    const userId = this.user.id;
    this.findPrenotazioni(userId);
    
    
  }

  findPrenotazioni(idUser: number) {
    this.service.getAllById(idUser).subscribe(prenotazioni => {
      console.log(prenotazioni)
      
      this.prenotazioni=this.prenotazioni.concat(prenotazioni)
      this.prenotazione=this.prenotazioni[this.prenotazioni.length-1]
    });
    this.ascervice.read
  }

}

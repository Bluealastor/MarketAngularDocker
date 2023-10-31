import { Component } from '@angular/core';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { NegozioDTO } from 'src/dto/negoziodto';
import { UserDTO } from 'src/dto/userdto';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { NegozioService } from 'src/service/negozio.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  displayedColumns: string[] = ['email', 'nascita', 'genere', 'indirizzo','password','button'];
  displayedColumns2: string[] = ['indirizzo', 'descrizione','button'];

  anagrafica : AnagraficaDTO = new AnagraficaDTO;
  user: UserDTO = new UserDTO;
  negozio : NegozioDTO = new NegozioDTO;

  password : String;

  constructor(private service: AnagraficaService, private servicenegozio : NegozioService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.password = this.user.password;
    this.password = this.password.replace(/./g, '*');
    this.findAnagrafica(this.user.id);
    this.findNegozio(this.user.id);
  }

  findAnagrafica(userId:number){
    this.service.findByUserId(userId).subscribe(anagrafica => {this.anagrafica = anagrafica;});
  }

  findNegozio(userId:number){
    this.servicenegozio.findByUserId(userId).subscribe(negozio => {this.negozio = negozio;
    });
  }
}

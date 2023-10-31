import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/dto/userdto';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { AnagraficaService } from 'src/service/anagrafica.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  user = new UserDTO
  anagrafica = new AnagraficaDTO

  findAnagrafica(userId: number) {
    this.service.findByUserId(userId).subscribe(anagrafica  => {this.anagrafica = anagrafica;}); 
  }

  constructor(private service: AnagraficaService) { }

  ngOnInit() {
   this.user = JSON.parse( localStorage.getItem('currentUser'));
   const userId = this.user.id;
   this.findAnagrafica(userId)
  }
  getUsers() {
    throw new Error('Method not implemented.');
  }

}

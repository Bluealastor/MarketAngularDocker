import { Component, Input } from '@angular/core';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { UserService } from 'src/service/user.service';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { Router } from '@angular/router';
import { UserDTO } from 'src/dto/userdto';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})


export class PopupComponent {


  anagrafici : AnagraficaDTO = new AnagraficaDTO;
  anagrafica: AnagraficaDTO[];
  user: UserDTO = new UserDTO;
  users: UserDTO[];
  id: number;

  @Input() title: string;
  @Input() message: string;
  showPopup = true;
  isVisible = false;


  constructor(private service: UserService, private serviceAnagrafica: AnagraficaService, private router: Router) {}

  ngOnInit(){
    this.getUsers();
    this.getAnagrafica();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log("user", this.user)
    this.id = this.user?.id;
    console.log(this.id)
    this.findAnagrafica(this.id);
    console.log(this.serviceAnagrafica)
    
  }

  getUsers() {
    this.service.getAll().subscribe((users) => (this.users = users));
    
  }

  getAnagrafica() {
    this.serviceAnagrafica.getAll().subscribe((anagrafici) => this.anagrafica = this.anagrafica);
  }

  findAnagrafica(userId:number){
    this.serviceAnagrafica.findByUserId(userId).subscribe(anagrafica => {this.anagrafici = anagrafica});
  }

  deleteAnagrafica() {
    this. getAnagrafica();
    this.serviceAnagrafica.delete(this.anagrafici.id).subscribe(() => this.getAnagrafica());
    console.log("porca Madonna", this.serviceAnagrafica)
    this. getAnagrafica();
    this.deleteUser();
    this.showPopup = false;
  }

  deleteUser() {
    this.getUsers();
    this.service.delete(this.user.id).subscribe(() => this.getUsers());
    this.getUsers();
    this.router.navigateByUrl('');
  }


  

}

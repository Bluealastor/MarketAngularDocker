import { Component } from '@angular/core';
import { UserDTO } from 'src/dto/userdto';
import { NegozioDTO } from 'src/dto/negoziodto';
import { NegozioService } from 'src/service/negozio.service';
import { MatDialog } from '@angular/material/dialog';
import { NegozioDialogComponent } from '../negozio-dialog/negozio-dialog.component';


@Component({
  selector: 'app-edit-negozio',
  templateUrl: './edit-negozio.component.html',
  styleUrls: ['./edit-negozio.component.css']
})

export class EditNegozioComponent {

  user: UserDTO = new UserDTO;
  negozio : NegozioDTO = new NegozioDTO;
  nomeTEMP : String;

  constructor(private servicenegozio : NegozioService,private dialog: MatDialog) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.findNegozio(this.user.id);
    this.nomeTEMP = this.negozio.nome;
  }

  openDialog() {
    this.dialog.open(NegozioDialogComponent);
  }

  findNegozio(userId:number){
    this.servicenegozio.findByUserId(userId).subscribe(negozio => {this.negozio = negozio;
      this.nomeTEMP = this.negozio.nome;});
  }

  update() {
    this.servicenegozio.update(this.negozio).subscribe(() => this.negozio);
  }

}

import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/dto/userdto';
import { Router } from '@angular/router';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { RefreshHeaderService } from 'src/app/admin/profile/refresh-header.service';
import { DialogDataExampleDialog } from './cart/cart.component';
import {MatDialog} from '@angular/material/dialog';
import { Usertype } from 'src/dto/usertype';
import { CartService } from 'src/service/cart.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isUserCollapsed = false;
  isClientCollapsed = false;
  isAccountCollapsed = false;
  isVisible = false;
  openCart = false;

  anagrafica: AnagraficaDTO = new AnagraficaDTO();
  user: UserDTO = new UserDTO();
  charNome: String;
  toolbar: boolean = false;
  elseBlock: any;

  badge: number;

  headerLogin() {
    const userData = localStorage.getItem('currentUser');
    const parsedData = JSON.parse(userData);
    const userType = parsedData?.usertype;

    if (userType != null) {
      this.toolbar = true;
    } else {
      this.toolbar = false;
    }
  }

  // private dialogConfig:MatDialogConfig,   va all'interno del costruttore
  constructor(
    private service: AnagraficaService,
    private router: Router,
    private refresh: RefreshHeaderService,
    private cservice: CartService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.showCart();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(localStorage.getItem('currentUser'));
    if (this.user?.id != null) {
      this.findAnagrafica(this.user!.id);
    }

    this.headerLogin();

    this.refresh.refreshHeader$.subscribe(() => {
      this.findAnagrafica(this.user.id);
      console.log("STO AGGIORNANDO IL NOME DELL'HEADER");
    });
  }

  showCart() {
    const userData = localStorage.getItem('currentUser');
    if (userData == null) {
    } else {
      const parsedData = JSON.parse(userData);
      const userType = parsedData.usertype;
      if (userType == 'USER') {
        this.openCart = true;
      } else {
        this.openCart = false;
      }
    }
  }

  findAnagrafica(userId: number) {
    this.service.findByUserId(userId).subscribe((anagrafica) => {
      this.anagrafica = anagrafica;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('');
  }

  enableDisable(): void {
    const userData = localStorage.getItem('currentUser');
    const parsedData = JSON.parse(userData);
    const userType = parsedData.usertype;
  }

  redirectToPage(): void {
    const userData = localStorage.getItem('currentUser');
    const parsedData = JSON.parse(userData);
    const userType = parsedData.usertype;

    if (userType == 'ADMIN') {
      console.log(localStorage.getItem('currentUser'));

      this.router.navigate(['/admin-dashboard/profile']);
    } else {
      this.router.navigate(['/user/profile']);
    }
  }
  redirectEdit(): void {
    const userData = localStorage.getItem('currentUser');
    const parsedData = JSON.parse(userData);
    const userType = parsedData.usertype;

    if (userType == 'USER') {
      this.router.navigate(['/user/edit']);
    } else {
      this.router.navigate(['/admin-dashboard/editProfile']);
    }
  }

  redirectHome(): void {
    const userData = localStorage.getItem('currentUser');
    const parsedData = JSON.parse(userData);
    const userType = parsedData.usertype;

    if (userType == 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    } else if (userType == 'USER') {
      this.router.navigate(['/user/dashboard']);
    }
  }
}


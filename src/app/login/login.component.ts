import { Component, OnInit } from '@angular/core';
import { LoginDTO } from 'src/dto/logindto';
import { FormControl, NgForm } from '@angular/forms';
import { UserService } from 'src/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDTO: LoginDTO;
  showPassword = false;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
  }

PasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login(f: NgForm): void {
    this.loginDTO = new LoginDTO(f.value.email, f.value.password);

    this.service.login(this.loginDTO).subscribe((user) => {
      if(user==null){
        
      }
      localStorage.setItem("token",user.token)
      if (user != null) {
        localStorage.setItem('currentUser', JSON.stringify(user));

        switch (user.usertype.toString()) {
          case 'ADMIN': {
            this.router.navigate(['/admin-dashboard']);
            break;
          }
          case 'USER': {
            this.router.navigate(['/user/dashboard']);
            break;
          }
          default:
            console.log("default")
            this.router.navigate(['/login']);
        }
      }
    });
  }
}

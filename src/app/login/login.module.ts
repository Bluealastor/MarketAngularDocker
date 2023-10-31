import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],

  imports: [
    
    MaterialModule,
    MatCheckboxModule,
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
  ]
  
})
export class LoginModule { }
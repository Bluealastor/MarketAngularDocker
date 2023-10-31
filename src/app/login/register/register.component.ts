import { Component } from '@angular/core';
import { UserDTO } from 'src/dto/userdto';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NegozioDTO } from 'src/dto/negoziodto';
import { UserService } from 'src/service/user.service';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { NegozioService } from 'src/service/negozio.service';
import { Observable } from 'rxjs';
import { LoginDTO } from 'src/dto/logindto';
import { sesso } from 'src/dto/anagrafica.sesso';
import { localeData } from 'moment';
import { ThemePalette } from '@angular/material/core';
import { ValidatorFn } from '@angular/forms';
import {RegisterDTO} from "src/dto/registerdto"
import { AbstractControl } from '@angular/forms';
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password1')?.value;
    const confirmPassword = control.get('password2')?.value;

    // Esegui i controlli sulla password
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    // Se la password è valida, restituisci null
    return ;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  
  isInsert:boolean=true;
  hide = true;
  user:UserDTO=new UserDTO;
  anagrafica :AnagraficaDTO=new AnagraficaDTO;
  negozio : NegozioDTO=new NegozioDTO;
  login :LoginDTO
  isAdmin= false;
  isEnd=true;
  firstFormGroup: FormGroup;
  thirdFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  
  constructor(private formBuilder : FormBuilder,private uService : UserService,private aService :AnagraficaService,private nService : NegozioService , private router: Router) {

    this.firstFormGroup = this.formBuilder.group({
      firstControl: new FormControl('',Validators.nullValidator),
      usertype: new FormControl('',Validators.nullValidator),
      password1 :new FormControl('',Validators.required),
      password2 : new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      checkbox:new FormControl('',Validators.required)
    },{ validator: passwordValidator() });
    this.secondFormGroup = this.formBuilder.group({
    indirizzo:new FormControl('',Validators.required),
    citta : new FormControl('',Validators.required) ,
    provincia : new FormControl('',Validators.required),
    nome :new FormControl('',Validators.required) ,
    cognome :new FormControl('',Validators.required),
    sesso :  new FormControl('',Validators.required),
    nazione : new FormControl('',Validators.required),
    dataNascita :new FormControl('',Validators.required)
    
  });
  this.thirdFormGroup = this.formBuilder.group({
    
    nomeNegozio:new FormControl('',Validators.required),
    indirizzoNegozio:new FormControl('',Validators.required),
    cittaNegozio : new FormControl('',Validators.required),
    provinciaNegozio :new FormControl('',Validators.required),
    descrizioneNegozio :new FormControl('',Validators.required),
  });
  }
  isEditable = false;
  isLinear = false;
  onInsertChange(event:any){
    console.log(event.value)
    if(event.value!=null){
      this.isInsert=false;
    }
  }
  ngOnInt(){
  }
  onEnd(){
    this.isEnd=false;
    this.user.email=this.firstFormGroup.value.email;
    this.user.password=this.firstFormGroup.value.password1
    this.user.usertype=(this.firstFormGroup.value.usertype=="ADMIN") ? 0 : 1
    this.anagrafica.user=this.user
    this.anagrafica.indirizzo=this.secondFormGroup.value.indirizzo
      this.anagrafica.sesso=(this.secondFormGroup.value.sesso=="UOMO")? sesso.UOMO : sesso.DONNA
      this.anagrafica.nome = this.secondFormGroup.value.nome
      this.anagrafica.cognome=this.secondFormGroup.value.cognome
      this.anagrafica.dataNascita=this.secondFormGroup.value.dataNascita
      this.anagrafica.citta=this.secondFormGroup.value.citta
      this.anagrafica.provincia=this.secondFormGroup.value.provincia
      this.anagrafica.nazione=this.secondFormGroup.value.nazione
      this.anagrafica.email=this.firstFormGroup.value.email
        if(this.firstFormGroup.value.usertype=="ADMIN"){
          this.negozio.user=this.anagrafica.user
          this.negozio.indirizzo=this.thirdFormGroup.value.indirizzoNegozio
          this.negozio.nome=this.thirdFormGroup.value.nomeNegozio
          this.negozio.provincia=this.thirdFormGroup.value.provinciaNegozio
          this.negozio.nazione=this.secondFormGroup.value.nazione
          this.negozio.citta=this.thirdFormGroup.value.cittaNegozio
          this.negozio.descrizione=this.thirdFormGroup.value.descrizioneNegozio 
  }else{
    this.negozio=null;
  }
  let register:RegisterDTO=new RegisterDTO
  register.anagraficaDTO=this.anagrafica
  register.negozioDTO=this.negozio
  this.uService.register(register).subscribe((user)=>{
    console.log(user)
  })
}
  onUserTypeChange() {
  if(this.firstFormGroup.value.usertype=="ADMIN"){
    this.isAdmin=true;
    console.log(this.firstFormGroup.value.usertype)
  }
 
  

}
userFiller(){

  }
  redirectLogin():void{
    this.router.navigate(["/login"]);
  }
}
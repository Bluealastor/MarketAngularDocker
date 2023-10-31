 import { Injectable } from '@angular/core';

 @Injectable({
   providedIn: 'root',
 })
 export class JwtService {
   constructor() {}

   has(): boolean {
     if (localStorage.getItem('keyToken') != null) {
       return true;
     } else {
       return false;
     }
   }

   get() : String {
     let token : String = localStorage.getItem('keyToken');
     return token
   }
 }

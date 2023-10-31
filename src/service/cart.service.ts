import { Injectable } from '@angular/core';
import { PrenotazioneService } from './prenotazioneservice';
import { ProductDTO } from 'src/dto/productdto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  badge:number
  dati: any[] = [];

  constructor() {
    this.dati = [];
  }

  addToCart(items: any[]): number {
    if (Array.isArray(items)) {
      this.dati.push(...items);
      console.log("service", items);
      this.badge++
      return this.badge
    } else {
      console.error("Invalid items format. Expected an array.");
      return null
    }
  }
  removeFromCart(id: number): number {
    this.dati = this.dati.filter(item => item.id !== id);
    this.badge--
    return this.badge
  }
  public addCartP(prod:ProductDTO){
    this.dati.push(prod);
  }

  getCartItems(): any[] {
    return this.dati;
  }

  clearCart(): void {
    this.dati = [];
  }
}

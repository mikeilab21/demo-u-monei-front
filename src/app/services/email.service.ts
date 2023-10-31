import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private sharedEmail: string;

  constructor() { }

  // Método para obtener los datos compartidos
  getSharedEmail(): any {
    return  this.sharedEmail ;
  }

  // Método para establecer los datos compartidos
  setSharedEmail(data: any): void {
    this.sharedEmail = data;
  }
}
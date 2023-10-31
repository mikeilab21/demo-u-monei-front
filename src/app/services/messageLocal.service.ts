import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessageLocalService {

  constructor(public messageService: MessageService) { }

  mesagge(severidad: any, enunciado?: string, detalle?: string){
    this.messageService.add({severity: severidad, summary: enunciado, detail: detalle });
  }
}

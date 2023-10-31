import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from 'src/app/services/apiSurvey/survey.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { MessageLocalService } from 'src/app/services/messageLocal.service';

@Component({
  selector: 'app-completed-application',
  templateUrl: './completed-application.component.html',
  styleUrls: ['./completed-application.component.css']
})
export class CompletedApplicationComponent {

  ratingValue!: number; // Valor inicial de la calificación
  text24: string = "Tu solicitud ingresará a un proceso de aprobación de 24 horas hábiles. "
    + "Luego recibirás una notificación por correo electrónico para continuar.";
  thankyou: boolean = false;
  nameClient : string = '';
  cc: number;
  year : number = new Date().getFullYear();

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private messageLocal: MessageLocalService,
    private surveyService: SurveyService){

  }

  ngOnInit(): void {
    this.nameClient = this.localStorageService.getItem('NameClient');
    this.cc = this.localStorageService.getItem('CC');
  }


  onRatingChange(event: any) {
    this.ratingValue = event;
  }

  send(){
   const data =  {
      cc : this.cc,
      name : this.nameClient,
      rate : this.ratingValue
     }

    if(this.ratingValue > 0){
      this.surveyService.postDataSurvey(data).subscribe({next: res=>{
        this.thankyou = true;
      }, error: e=>{
        this.messageLocal.mesagge('info', 'Error al enviar la calificación, Intente nuevamente');
      }})


    }
  }
}

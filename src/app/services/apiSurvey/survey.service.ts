import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private apiUrl = environment.apiEndpoint;
  constructor(private http: HttpClient) { }

   // Método para enviar datos a la API de la encuesta de calificación
   postDataSurvey(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/survey-rates`, data);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiEndpoint;
  constructor(private http: HttpClient) { }

  // Método para obtener datos de la API
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/register`);
  }

  //api para registro de usuario con otp
  postDataUserRegister(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/user_register`, data);
  }
  // Método para enviar datos a la API
  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/register`, data);
  }
  // Método para enviar datos a la API de informacion del contrato
  postDataContract(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/contract`, data);
  }

  // Método para enviar datos a la API de informacion del contrato
  postDataReferences(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/references`, data);
  }

  posDataCalculatorInfo(data: any) {
    return this.http.post<any>(`${this.apiUrl}/api/calculator-info`, data);
  }

}

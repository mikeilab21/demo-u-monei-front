import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiDropDownService {
  private apiUrl = environment.apiEndpoint;
  constructor(private http: HttpClient) { }

  // Método para obtener datos de la API
  getCiiu(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/ciiu-codes`);
  }

  // Método para obtener datos de tipo de empresa de la API
  getCompanyType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/type`);
  }

  // Método para obtener datos de códigos de países de la API
  getCountryCodes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/international-codes`);
  }

  //Metodo para obtener los tipos de contrato
  getContractType():  Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/contract-type`);
  }
  // Método para obtener datos de códigos de países de la API
  postCompany(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/company`, data);
  }
}

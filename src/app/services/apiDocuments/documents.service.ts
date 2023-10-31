import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private apiUrl = environment.apiEndpoint;
  constructor(private http: HttpClient) { }

  // Método para obtener datos de la API
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/upload`);
  }

  // Método para enviar datos a la API
  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/upload`, data);
  }
}

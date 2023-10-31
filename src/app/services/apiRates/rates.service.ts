import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RatesService {
  private apiUrl = environment.apiEndpoint;
  constructor(private http: HttpClient) { }

  // Método para obtener datos de la API
  getRates(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/interest-rates`);
  }
}

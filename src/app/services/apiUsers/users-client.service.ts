import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersClientService {

  private apiUrl = environment.apiEndpoint;
  constructor(private http: HttpClient) { }

  // Método para obtener datos de la API
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/users`);
  }

  deleteOnlyUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/api/users/${id}`;
    return this.http.delete<any>(url);
  }

  updateOnlyUser(id: number, userData: any): Observable<any> {
    const url = `${this.apiUrl}/api/users/${id}`;
    return this.http.put<any>(url, userData);
  }
}

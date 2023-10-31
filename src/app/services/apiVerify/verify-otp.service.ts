import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyOtpService {

  private apiUrl = environment.apiEndpoint;

  constructor(private http: HttpClient) {

  }

    // Método para enviar datos a la API
    postData(data: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/api/otpVerification`, data);
    }
}

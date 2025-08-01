import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export type Systeme = 'PRIMAIRE' | 'COLLEGE' | 'LYCEE';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, credentials);
  }

  registerUser(data: { email: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/save`, data);
  }

  saveConfiguration(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/ecole`, formData);
  }

  getCurrentSystem(): Observable<Systeme> {
    return this.http.get<Systeme>(`${this.baseUrl}/system`);
  }

  selectSystem(systeme: Systeme): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/system?system=${systeme}`, {});
  }
}

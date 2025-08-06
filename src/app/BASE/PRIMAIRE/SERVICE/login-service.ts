import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';


export interface Configuration {
  id: number;
  nom: string;
  adresse: string;
  bp: string;
  cel: string;
  devise: string;
  image?: string;
  tel: string;
  systeme: Systeme;
}


export type Systeme = 'PRIMAIRE' | 'COLLEGE' | 'LYCEE';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private baseUrl = environment.apiUrl;

  // Stockage local du rôle (ici avec BehaviorSubject pour être réactif)
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string; role: string }>(`${this.baseUrl}/user/login`, credentials).pipe(
      tap(response => {
        this.userRoleSubject.next(response.role);
        localStorage.setItem('userRole', response.role);
      })
    );
  }

  // Méthode pour récupérer le rôle courant depuis le BehaviorSubject ou localStorage
  getUserRole(): string | null {
    if (!this.userRoleSubject.value) {
      const storedRole = localStorage.getItem('userRole');
      this.userRoleSubject.next(storedRole);
    }
    return this.userRoleSubject.value;
  }

  // Méthode pour savoir si l'utilisateur est admin
  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  registerUser(data: {
    email: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/save`, data);
  }

  saveConfiguration(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/ecole`, formData);
  }

  getLogoImage(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/ecole/image`, {
      responseType: 'blob'
    });
  }

  getCurrentSystem(): Observable<Systeme> {
    return this.http.get<Systeme>(`${this.baseUrl}/system`);
  }

  selectSystem(systeme: Systeme): Observable<string> {
    return this.http.post<string>(
      `${this.baseUrl}/system?system=${systeme}`,
      {}
    );
  }

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/roles`);
  }


  getAllUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/user/utilisateur`);
}


// ✅ Modifier un utilisateur
updateUser(id: number, data: {
  email: string;
  password: string;
  role: string;
}): Observable<any> {
  return this.http.put(`${this.baseUrl}/user/${id}`, data);
}

// ✅ Supprimer un utilisateur
deleteUser(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/user/${id}`);
}




getAllConfigurations(): Observable<Configuration[]> {
  return this.http.get<Configuration[]>(`${this.baseUrl}/ecole`);
}


getLogo(): Observable<string> {
  return this.http.get(`${this.baseUrl}/ecole/image`, { responseType: 'blob' }).pipe(
    switchMap(blob => this.convertBlobToBase64(blob))
  );
}

private convertBlobToBase64(blob: Blob): Observable<string> {
  return new Observable<string>(observer => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;
      // base64data est de la forme "data:image/png;base64,......"
      observer.next(base64data);
      observer.complete();
    };
    reader.onerror = error => observer.error(error);
    reader.readAsDataURL(blob);
  });
}



}

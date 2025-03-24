import { computed, HostListener, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { RegisterUser } from '../interfaces/register-user.interface';


type AuthStatus = 'checking' | 'authenticated' | 'no-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);


  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

 public authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') {
      return 'checking';
    }

    if (this._user() != null) {
      return 'authenticated';
    }

    return 'no-authenticated';
  });

  public user = computed<User | null>(this._user);
  public token = computed<string | null>(this._token);

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/Account/Login`, {
        userName: email,
        password: password,
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error: any) => {
          this.logout();
          return this.handleError(error)
        })
      );
  }
 
  checkStatusToken(): Observable<boolean> {
    
    if (this.isLocalStorageAvailable()) {
     
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');

      if (!token) {
        this.logout();
        return of(false);
      }

      return this.http
        .get<User>(`${baseUrl}/Account/StatusAuth?id=${id}`, {
          // headers:{
          //   Authorization:`Bearer ${token}`
          // }
        })
        .pipe(
          map((resp) => this.handleStatusAuthSuccess(resp, token)),
          catchError((error: any) => this.handleError(error))
        );
    }

    return of(false);
  }

  logout() {
    this._authStatus.set('no-authenticated');
    this._user.set(null);
    this._token.set(null);

    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  private handleAuthSuccess(resp: AuthResponse) {
    this._user.set(resp.userDto);
    this._authStatus.set('authenticated');
    this._token.set(resp.token);

    localStorage.setItem('token', resp.token);
    localStorage.setItem('id', resp.userDto.id);

    return true;
  }

  private handleStatusAuthSuccess(user: User, token: string) {
   
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);

    return true;
  }

  private handleError(error: any) {
    // this.logout();
    return throwError(() => new Error(error.error));
  }

  register(userData:RegisterUser):Observable<boolean>{
    return this.http.post<User>(`${baseUrl}/Account/Register`,userData)
     .pipe(
      map((resp) => true),
      catchError((error:any) => this.handleError(error))
    );
  }
}

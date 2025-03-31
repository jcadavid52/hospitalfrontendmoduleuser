import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment.development';
import { catchError, map, of } from 'rxjs';
import { RegisterUser } from '../interfaces/register-user.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should is authenticated and should exist an token and id in the localStorage', () => {
    const userMock: User | null = {
      id: '12345',
      fullName: 'Juan Pérez',
      userName: 'juanperez',
      email: 'juanperez@example.com',
      phoneNumber: '123-456-7890',
      age: 30,
      address: 'Calle Falsa 123, Ciudad, País',
      roles: ['Admin', 'User'],
    };
    const expectedResponse: AuthResponse = {
      token: 'token123456Zyx',
      userDto: userMock,
    };
    service
      .login('juanperez@example.com', 'Colombia2025*')
      .subscribe((resp) => {
        expect(resp).toEqual(true);
        expect(service.authStatus()).toBe('authenticated');
        expect(service.user()).not.toBeNull();
        expect(service.token()).not.toBeNull();
        expect(service.user()).toEqual(userMock);
      });

    const req = httpMock.expectOne(`${baseUrl}/Account/Login`);
    expect(req.request.method).toBe('POST');

    req.flush(expectedResponse);

    expect(expectedResponse.token).toEqual(localStorage.getItem('token')!);
    expect(expectedResponse.userDto.id).toEqual(localStorage.getItem('id')!);
  });

  it('should is not authenticated and should no exist the properties id and token in the localStorage', () => {
    service
      .login('juanperez@example.com', 'Colombia2025*')
      .pipe(
        catchError((error) => {
          expect(error.message).toContain('clave o usuario inválido');
          expect(service.authStatus()).toBe('no-authenticated');
          expect(service.user()).toBeNull();
          expect(service.token()).toBeNull();

          return [];
        })
      )
      .subscribe();

    const req = httpMock.expectOne(`${baseUrl}/Account/Login`);
    expect(req.request.method).toBe('POST');

    req.flush('clave o usuario inválido', {
      status: 401,
      statusText: 'Unauthorized',

    });

    const token: string | null = '';
    const id: string | null = '';

    expect(token).toEqual(localStorage.getItem('token') ?? '');
    expect(id).toEqual(localStorage.getItem('id') ?? '');
  });

  it('should register an user successfuly',() =>{
    const userRegisterMock: RegisterUser | null = {
      
      email: 'usuariotest@example.com',
      password: 'Colombia2025*',
      fullName: 'Usuario Test',
      confirmPassword:'Colombia2025*',
      address: 'Calle Falsa 456, Ciudad, País',
      age: 30,
      phoneNumber: '695115445'
    };

    const userMock: User | null = {
      id: '678910',
      fullName: 'Usuario Test',
      userName: 'usuariotest@example.com',
      email: 'usuariotest@example.com',
      phoneNumber: '695115445',
      age: 30,
      address: 'Calle Falsa 456, Ciudad, País',
      roles: ['User'],
    };

    service.register(userRegisterMock).subscribe((resp) => {
      expect(resp).toEqual(true);
      
    })

    const req = httpMock.expectOne(`${baseUrl}/Account/Register`);
    req.flush(userMock);
  })

  it('should register an user not-successfuly-password no match',() =>{
    const userMock: RegisterUser | null = {
      
      email: 'juanperez@example.com',
      password: 'Colombia2024*',
      fullName: 'Usuario Test',
      confirmPassword:'Colombia2025*',
      address: 'Calle Falsa 123, Ciudad, País',
      age: 30,
      phoneNumber: '695115445'
    };

    service.register(userMock).pipe(catchError((error) => {
      expect(error.message).toContain('Las contraseñas no coinciden');
      return [];
    })).subscribe()

    const req = httpMock.expectOne(`${baseUrl}/Account/Register`);
    req.flush('Las contraseñas no coinciden',{
      status:400,
      statusText:'Bad Request'
    });
  })
});

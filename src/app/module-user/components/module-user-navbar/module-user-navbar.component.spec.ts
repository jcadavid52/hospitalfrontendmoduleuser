import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleUserNavbarComponent } from './module-user-navbar.component';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { User } from '../../../auth/interfaces/user.interface';


describe('ModuleUserNavbarComponent', () => {
  let component: ModuleUserNavbarComponent;
  let fixture: ComponentFixture<ModuleUserNavbarComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', [
      'authStatus',
      'user',
      'logout',
    ]);
    await TestBed.configureTestingModule({
      imports: [ModuleUserNavbarComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModuleUserNavbarComponent);
    // authServiceMock = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show username and botton logout, if is authenticated', () => {
    
    const userMock:User|null={
      id: "12345",
      fullName: "Juan Pérez",
      userName: "juanperez",
      email: "juanperez@example.com",
      phoneNumber: "123-456-7890",
      age: 30,
      address: "Calle Falsa 123, Ciudad, País",
      roles: ["Admin", "User"]
    }

    authServiceMock.authStatus.and.returnValue('authenticated');
    authServiceMock.user.and.returnValue(userMock);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
   
    
    expect(compiled.querySelector('p')?.textContent).toEqual('Bienvenido, Juan Pérez');
    expect(compiled.querySelector('button')?.textContent).toEqual('Cerrar Sesión')
  });

  it('should show routes login and register if is not authenticated',() =>{
    authServiceMock.authStatus.and.returnValue('no-authenticated');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('a')[0].textContent).toEqual('Login');
    expect(compiled.querySelectorAll('a')[1].textContent).toEqual('Registro');

    authServiceMock.authStatus.and.returnValue('checking');
    fixture.detectChanges();

    expect(compiled.querySelectorAll('a')[0].textContent).toEqual('Login');
    expect(compiled.querySelectorAll('a')[1].textContent).toEqual('Registro');
  })

  it('should call logout method when logout button is clicked', () => {

    const userMock:User|null={
      id: "12345",
      fullName: "Juan Pérez",
      userName: "juanperez",
      email: "juanperez@example.com",
      phoneNumber: "123-456-7890",
      age: 30,
      address: "Calle Falsa 123, Ciudad, País",
      roles: ["Admin", "User"]
    }



    authServiceMock.authStatus.and.returnValue('authenticated');
    authServiceMock.user.and.returnValue(userMock);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    fixture.detectChanges();

    expect(authServiceMock.logout).toHaveBeenCalled();
    
  });

});

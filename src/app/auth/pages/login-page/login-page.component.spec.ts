import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { By } from '@angular/platform-browser';
import { Type } from '@angular/core';
let authServiceMock: jasmine.SpyObj<AuthService>;

fdescribe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', [
      'authStatus',
      'user',
      'logout',
    ]);
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid if the form is empty', () => {
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should the usernamefield be required', () => {
    component.emailField?.setValue('');

    expect(component.emailField?.invalid).withContext('empty').toBeTruthy();
  });

  it('should the passwordfield be required', () => {
    component.passwordField?.setValue('');

    expect(component.passwordField?.invalid).withContext('empty').toBeTruthy();
  });

  it('should the login form be valid', () => {
    component.emailField?.setValue('usernametest@gmail.com');
    expect(component.emailField?.valid).withContext('username').toBeTruthy();

    component.passwordField?.setValue('Colombia2025*');
    expect(component.passwordField?.valid).withContext('password').toBeTruthy();
  });

  it('should the usernamefield be required from UI', () => {
    const inputDe = query(fixture, 'input#email');
    const inputEl: HTMLInputElement = inputDe.nativeElement;

    inputEl.value = '';
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(component.passwordField?.invalid).withContext('empty').toBeTruthy();

    const textError = getText(fixture, 'emailField-required');

    expect(textError).toContain('Requerido');
  });

  it('should the passwordfield be required from UI', () => {
    const inputDe = query(fixture, 'input#password');
    const inputEl: HTMLInputElement = inputDe.nativeElement;

    inputEl.value = '';
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(component.passwordField?.invalid).withContext('empty').toBeTruthy();

    const textError = getText(fixture, 'passwordField-required');

    expect(textError).toContain('Requerido');
  });

  it('should the login form be valid from UI', () => {

    const inputUser = query(fixture, 'input#email');
    const inputPass = query(fixture, 'input#password');

    const inputElUser: HTMLInputElement = inputUser.nativeElement;
    const inputElPass: HTMLInputElement = inputPass.nativeElement;

    inputElUser.value = 'usernametest@gmail.com';
    inputElPass.value = 'Colombia2025*';

    inputElUser.dispatchEvent(new Event('input'));
    inputElUser.dispatchEvent(new Event('blur'));
    inputElPass.dispatchEvent(new Event('input'));
    inputElPass.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    const selectorUser = 'emailField-required';
    const selectorPass = 'passwordField-required';

    expect(() => query(fixture, selectorPass)).
    toThrowError(`query: Element with ${selectorPass} not found`);

    expect(() => query(fixture, selectorUser)).
    toThrowError(`query: Element with ${selectorUser} not found`);
  
  });
    
    
});

function getText<T>(fixture: ComponentFixture<T>, testId: string) {
  const debugElement = queryById(fixture, testId);
  const element: HTMLElement = debugElement.nativeElement;
  return element.textContent;
}

function query<T>(fixture: ComponentFixture<T>, selector: string) {
  const debugElement = fixture.debugElement.query(By.css(selector));
  if (!debugElement) {
    throw new Error(`query: Element with ${selector} not found`);
  }
  return debugElement;
}

export function queryById<T>(fixture: ComponentFixture<T>, testId: string) {
  const selector = `#${testId}`;
  return query(fixture, selector);
}

export function queryAll<T>(fixture: ComponentFixture<T>, selector: string) {
  return fixture.debugElement.queryAll(By.css(selector));
}

export function queryAllByDirective<T, D>(
  fixture: ComponentFixture<T>,
  directive: Type<D>
) {
  return fixture.debugElement.queryAll(By.directive(directive));
}

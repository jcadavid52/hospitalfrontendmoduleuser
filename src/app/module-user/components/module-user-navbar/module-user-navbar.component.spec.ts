import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleUserNavbarComponent } from './module-user-navbar.component';

describe('ModuleUserNavbarComponent', () => {
  let component: ModuleUserNavbarComponent;
  let fixture: ComponentFixture<ModuleUserNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleUserNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleUserNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

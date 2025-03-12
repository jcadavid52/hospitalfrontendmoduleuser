import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleUserLayoutComponent } from './module-user-layout.component';

describe('ModuleUserLayoutComponent', () => {
  let component: ModuleUserLayoutComponent;
  let fixture: ComponentFixture<ModuleUserLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleUserLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleUserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedPageComponent } from './protected-page.component';

describe('ProtectedPageComponent', () => {
  let component: ProtectedPageComponent;
  let fixture: ComponentFixture<ProtectedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectedPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtectedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

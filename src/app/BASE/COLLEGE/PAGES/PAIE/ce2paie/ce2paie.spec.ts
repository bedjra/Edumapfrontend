import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ce2paie } from './ce2paie';

describe('Ce2paie', () => {
  let component: Ce2paie;
  let fixture: ComponentFixture<Ce2paie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ce2paie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ce2paie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

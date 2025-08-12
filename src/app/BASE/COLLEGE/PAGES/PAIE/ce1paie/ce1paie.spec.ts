import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ce1paie } from './ce1paie';

describe('Ce1paie', () => {
  let component: Ce1paie;
  let fixture: ComponentFixture<Ce1paie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ce1paie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ce1paie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

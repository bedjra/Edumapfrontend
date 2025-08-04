import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cm1paie } from './cm1paie';

describe('Cm1paie', () => {
  let component: Cm1paie;
  let fixture: ComponentFixture<Cm1paie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cm1paie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cm1paie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cm2paie } from './cm2paie';

describe('Cm2paie', () => {
  let component: Cm2paie;
  let fixture: ComponentFixture<Cm2paie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cm2paie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cm2paie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

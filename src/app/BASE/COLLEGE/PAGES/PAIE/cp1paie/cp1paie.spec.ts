import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp1paie } from './cp1paie';

describe('Cp1paie', () => {
  let component: Cp1paie;
  let fixture: ComponentFixture<Cp1paie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cp1paie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp1paie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

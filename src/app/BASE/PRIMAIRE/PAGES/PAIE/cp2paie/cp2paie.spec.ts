import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2paie } from './cp2paie';

describe('Cp2paie', () => {
  let component: Cp2paie;
  let fixture: ComponentFixture<Cp2paie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cp2paie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2paie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

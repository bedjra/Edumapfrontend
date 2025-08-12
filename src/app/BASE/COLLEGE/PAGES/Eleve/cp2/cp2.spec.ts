import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2 } from './cp2';

describe('Cp2', () => {
  let component: Cp2;
  let fixture: ComponentFixture<Cp2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cp2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

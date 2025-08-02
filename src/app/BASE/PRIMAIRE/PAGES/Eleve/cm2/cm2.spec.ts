import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cm2 } from './cm2';

describe('Cm2', () => {
  let component: Cm2;
  let fixture: ComponentFixture<Cm2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cm2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cm2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

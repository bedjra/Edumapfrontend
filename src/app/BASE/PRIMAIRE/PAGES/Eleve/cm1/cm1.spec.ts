import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cm1 } from './cm1';

describe('Cm1', () => {
  let component: Cm1;
  let fixture: ComponentFixture<Cm1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cm1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cm1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

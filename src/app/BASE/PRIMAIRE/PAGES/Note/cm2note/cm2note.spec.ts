import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cm2note } from './cm2note';

describe('Cm2note', () => {
  let component: Cm2note;
  let fixture: ComponentFixture<Cm2note>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cm2note]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cm2note);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

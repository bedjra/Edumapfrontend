import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cm1note } from './cm1note';

describe('Cm1note', () => {
  let component: Cm1note;
  let fixture: ComponentFixture<Cm1note>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cm1note]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cm1note);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

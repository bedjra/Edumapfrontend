import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ce2note } from './ce2note';

describe('Ce2note', () => {
  let component: Ce2note;
  let fixture: ComponentFixture<Ce2note>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ce2note]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ce2note);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

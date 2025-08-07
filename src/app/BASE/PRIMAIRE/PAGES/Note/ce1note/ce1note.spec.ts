import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ce1note } from './ce1note';

describe('Ce1note', () => {
  let component: Ce1note;
  let fixture: ComponentFixture<Ce1note>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ce1note]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ce1note);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

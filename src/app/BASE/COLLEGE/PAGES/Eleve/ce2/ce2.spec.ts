import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ce2 } from './ce2';

describe('Ce2', () => {
  let component: Ce2;
  let fixture: ComponentFixture<Ce2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ce2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ce2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

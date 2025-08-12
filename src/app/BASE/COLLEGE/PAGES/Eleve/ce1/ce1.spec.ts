import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ce1 } from './ce1';

describe('Ce1', () => {
  let component: Ce1;
  let fixture: ComponentFixture<Ce1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ce1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ce1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

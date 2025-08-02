import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prof } from './prof';

describe('Prof', () => {
  let component: Prof;
  let fixture: ComponentFixture<Prof>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prof]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Prof);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

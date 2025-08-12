import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp1 } from './cp1';

describe('Cp1', () => {
  let component: Cp1;
  let fixture: ComponentFixture<Cp1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cp1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

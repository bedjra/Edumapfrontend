import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp1note } from './cp1note';

describe('Cp1note', () => {
  let component: Cp1note;
  let fixture: ComponentFixture<Cp1note>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cp1note]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp1note);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

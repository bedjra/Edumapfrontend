import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2note } from './cp2note';

describe('Cp2note', () => {
  let component: Cp2note;
  let fixture: ComponentFixture<Cp2note>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cp2note]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2note);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

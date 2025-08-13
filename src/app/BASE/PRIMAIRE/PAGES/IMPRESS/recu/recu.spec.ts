import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recu } from './recu';

describe('Recu', () => {
  let component: Recu;
  let fixture: ComponentFixture<Recu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

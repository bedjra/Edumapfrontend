import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scolarite } from './scolarite';

describe('Scolarite', () => {
  let component: Scolarite;
  let fixture: ComponentFixture<Scolarite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scolarite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scolarite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

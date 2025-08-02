import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Primaire } from './primaire';

describe('Primaire', () => {
  let component: Primaire;
  let fixture: ComponentFixture<Primaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Primaire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Primaire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

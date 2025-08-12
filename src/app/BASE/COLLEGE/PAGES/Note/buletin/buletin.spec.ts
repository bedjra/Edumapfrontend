import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buletin } from './buletin';

describe('Buletin', () => {
  let component: Buletin;
  let fixture: ComponentFixture<Buletin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buletin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Buletin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

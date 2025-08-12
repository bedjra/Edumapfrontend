import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Basecol } from './basecol';

describe('Basecol', () => {
  let component: Basecol;
  let fixture: ComponentFixture<Basecol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Basecol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Basecol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

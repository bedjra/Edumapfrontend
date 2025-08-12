import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Note4 } from './note4';

describe('Note4', () => {
  let component: Note4;
  let fixture: ComponentFixture<Note4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Note4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Note4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

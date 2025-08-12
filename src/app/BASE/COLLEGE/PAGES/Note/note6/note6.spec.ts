import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Note6 } from './note6';

describe('Note6', () => {
  let component: Note6;
  let fixture: ComponentFixture<Note6>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Note6]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Note6);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Note2 } from './note2';

describe('Note2', () => {
  let component: Note2;
  let fixture: ComponentFixture<Note2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Note2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Note2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

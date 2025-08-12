import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Note1 } from './note1';

describe('Note1', () => {
  let component: Note1;
  let fixture: ComponentFixture<Note1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Note1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Note1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

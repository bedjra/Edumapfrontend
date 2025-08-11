import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Note5 } from './note5';

describe('Note5', () => {
  let component: Note5;
  let fixture: ComponentFixture<Note5>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Note5]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Note5);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

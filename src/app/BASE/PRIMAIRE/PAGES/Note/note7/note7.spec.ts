import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Note7 } from './note7';

describe('Note7', () => {
  let component: Note7;
  let fixture: ComponentFixture<Note7>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Note7]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Note7);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

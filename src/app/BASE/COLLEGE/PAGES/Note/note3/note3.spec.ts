import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Note3 } from './note3';

describe('Note3', () => {
  let component: Note3;
  let fixture: ComponentFixture<Note3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Note3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Note3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

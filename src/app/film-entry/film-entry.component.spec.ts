import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmEntryComponent } from './film-entry.component';

describe('FilmEntryComponent', () => {
  let component: FilmEntryComponent;
  let fixture: ComponentFixture<FilmEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

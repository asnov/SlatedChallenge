import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { FilmListComponent } from './film-list.component';
import { preparedFilmCache } from '../../data/testData';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({selector: 'app-film-entry', template: ''})
class FilmEntryComponent {
}

// const filmEntryComponentStub: Partial<FilmEntryComponent> = {
//   item: preparedFilmCache['film'].films[0],
// };


describe('FilmListComponent', () => {
  let component: FilmListComponent;
  let fixture: ComponentFixture<FilmListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilmListComponent,
        // FilmEntryComponent,
      ],
      providers: [
        // {provide: FilmEntryComponent, useValue: filmEntryComponentStub},
        // {provide: ComponentFixtureAutoDetect, useValue: true},
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmListComponent);
    component = fixture.componentInstance;
    component.films = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

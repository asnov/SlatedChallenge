import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmEntryComponent } from './film-entry.component';
import { SanitizePipe } from '../pipes/sanitize.pipe';
import { preparedFilmCache } from '../../data/testData';

const sanitizePipeStub: Partial<SanitizePipe> = {
  transform(s: string) {
    return s;
  }
};


describe('FilmEntryComponent', () => {
  let component: FilmEntryComponent;
  let fixture: ComponentFixture<FilmEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilmEntryComponent,
        SanitizePipe,
      ],
      providers: [
        {provide: SanitizePipe, useValue: sanitizePipeStub},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmEntryComponent);
    component = fixture.componentInstance;
    component.item = preparedFilmCache['film'].films[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

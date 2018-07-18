import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GetFilmsService } from './get-films.service';
import { FilmObj } from '../data/models';
import { fromEvent, Observable } from 'rxjs';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { concatMap, distinctUntilChanged, map, startWith, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GetFilmsService, SanitizePipe],
})
export class AppComponent implements AfterViewInit {
  environment = environment;

  @ViewChild('input')
  input: ElementRef<HTMLInputElement>;

  $films: Observable<FilmObj[]>;
  searchString = '';

  constructor(private getFilmsService: GetFilmsService) {
  }

  ngAfterViewInit() {

    const $keyEvent: Observable<Event> = fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup');

    const $searchString: Observable<string> = $keyEvent.pipe(
      map(event => event.target as HTMLInputElement),
      map(element => element.value),
      startWith(environment.production ? '' : 'Film'),
      tap(value => {
        this.searchString = value;
      }),
      map(value => value.toLowerCase().trim()),
      distinctUntilChanged(),
    );

    this.$films = $searchString.pipe(
      concatMap(string => this.getFilmsService.getFilmsByName(string)),
    );

  }

}

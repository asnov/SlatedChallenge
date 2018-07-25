import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { concatMap, distinctUntilChanged, map, startWith, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { GetFilmsService } from './services/get-films.service';
import { FilmObj } from '../data/models';
import { SanitizePipe } from './pipes/sanitize.pipe';


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
  isLoaded$: Observable<boolean>;

  constructor(private getFilmsService: GetFilmsService) {
  }

  ngAfterViewInit() {

    const $keyEvent: Observable<Event> = fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup');

    const $searchString: Observable<string> = $keyEvent.pipe(
      map(event => event.target as HTMLInputElement),
      map(element => element.value),
      // startWith(environment.production ? '' : 'Film'),
      tap(value => {
        this.searchString = value;
      }),
      map(value => value.toLowerCase().trim()),
      distinctUntilChanged(),
    );

    this.$films = $searchString.pipe(
      concatMap(string => this.getFilmsService.getFilmsByName(string)),
    );

    let requestsInProcess = 0;
    this.isLoaded$ = merge($searchString, this.$films).pipe(
      map(value => {
        if (typeof value === 'string') {
          requestsInProcess++;
        } else {
          requestsInProcess--;
        }
        console.log(`requestsInProcess:`, requestsInProcess);
        return requestsInProcess === 0;
      }),
    );

  }

}

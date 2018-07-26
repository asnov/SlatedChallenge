import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { GetFilmsService } from './services/get-films.service';
import { FilmObj } from '../data/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GetFilmsService],
})
export class AppComponent implements AfterViewInit {
  environment = environment;

  @ViewChild('input')
  input: ElementRef<HTMLInputElement>;

  $films: Observable<FilmObj[]>;
  searchString = '';
  isLoading$: Observable<boolean>;

  constructor(private getFilmsService: GetFilmsService) { }

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
      switchMap(string => this.getFilmsService.getFilmsByName(string)),
    );

    this.isLoading$ = merge(
      $searchString.pipe(map(() => true)),
      this.$films.pipe(map(() => false)),
    );

  }

}

import { AfterViewInit, Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { GetFilmsService } from './get-films.service';
import { Film } from '../models/film';
import { from, fromEvent, Observable } from 'rxjs';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { distinctUntilChanged, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { fromArray } from 'rxjs/internal/observable/fromArray';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GetFilmsService, SanitizePipe],
})
export class AppComponent implements AfterViewInit {

  @ViewChild('input')
  input: ElementRef<HTMLInputElement>;

  title = 'app';
  public searchString = '';
  // $searchString = new EventEmitter<string>();
  $keyEvent: Observable<Event>;
  $searchString: Observable<string>;
  $films: Observable<Film[]>;

  constructor(private getFilmsService: GetFilmsService) {
  }

  ngAfterViewInit() {

    this.$keyEvent = fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup');

    this.$searchString = this.$keyEvent.pipe(
      map(event => event.target as HTMLInputElement),
      map(element => element.value),
      distinctUntilChanged(),
      // filter(value => !!value),
    );

    this.$films = this.$searchString.pipe(
      // switchMap(string => string ? this.getFilmsService.getFilmsByName(string) : fromArray([[]])),
      // map(string => string ? this.getFilmsService.getFilmsByName(string) : fromArray([[]])),
      mergeMap(string => string ? this.getFilmsService.getFilmsByName(string) : fromArray([[]])),
    );

  }

  onKeyPress(event: KeyboardEvent) {
    const tagetEl: HTMLInputElement = event.target as HTMLInputElement;
    if (this.searchString !== tagetEl.value) {
      this.searchString = tagetEl.value;
      // this.$searchString.emit(tagetEl.value);

      // this.films = (new Observable).pipe(
      //   switchMap(() => this.getFilmsService.getFilmsByName(tagetEl.value))
      // );
      // this.films = this.getFilmsService.getFilmsByName(tagetEl.value);
    }
  }

}

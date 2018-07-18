import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GetFilmsService } from './get-films.service';
import { FilmObj } from '../data/models';
import { fromEvent, Observable } from 'rxjs';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { concatMap, distinctUntilChanged, map, mergeMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GetFilmsService, SanitizePipe],
})
export class AppComponent implements AfterViewInit {

  @ViewChild('input')
  input: ElementRef<HTMLInputElement>;

  public searchString = '';
  $keyEvent: Observable<Event>;
  $searchString: Observable<string>;
  $films: Observable<FilmObj[]>;

  constructor(private getFilmsService: GetFilmsService) {
  }

  ngAfterViewInit() {

    this.$keyEvent = fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup');

    this.$searchString = this.$keyEvent.pipe(
      map(event => event.target as HTMLInputElement),
      map(element => element.value.toLowerCase().trim()),
      distinctUntilChanged(),
    );

    this.$films = this.$searchString.pipe(
      switchMap(string => this.getFilmsService.getFilmsByName(string)),
      // map(string => this.getFilmsService.getFilmsByName(string)),
      // mergeMap(string => this.getFilmsService.getFilmsByName(string)),
      // concatMap(string => this.getFilmsService.getFilmsByName(string)),
    );

  }

}

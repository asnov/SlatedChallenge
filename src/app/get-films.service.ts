import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FilmObj, FilmCache } from '../data/models';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetFilmsService {

  films: FilmCache = {};

  constructor(private http: HttpClient) {
  }

  getFilmsByName(name: string): Observable<FilmObj[]> {
    name = name.toLowerCase().trim();
    console.log(name);

    if (!name) {
      return of([]);
    }
    if (this.films[name]
      && Date.now() - this.films[name].timeStamp < environment.cacheTimeoutInMs) {
      return of(this.films[name].films);
    }
    const $films = this.http
      .jsonp<FilmObj[]>(`${environment.apiUrl}?term=${name}`, `callback`)
      .pipe(
        tap(films => {
          this.films[name] = {films, timeStamp: Date.now()};
        }),
      );

    // $films
    //   .subscribe(
    //     value => {
    //       console.log(`next:`, value.length);
    //     },
    //     error => {
    //       console.log(`error:`, error);
    //     },
    //     () => {
    //       console.log(`complete`);
    //     }
    //   );

    return $films;
  }

}

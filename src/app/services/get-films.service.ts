import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { FilmCache, FilmObj } from '../../data/models';
import { preparedFilmCache } from '../../data/tests.spec';


@Injectable({
  providedIn: 'root'
})
export class GetFilmsService {

  filmCache: FilmCache = environment.production ?
    {} :
    preparedFilmCache;

  constructor(private http: HttpClient) {
  }

  getFilmsByName(name: string): Observable<FilmObj[]> {
    if (!name) {
      return of([]);
    }
    if (this.filmCache[name]
      && Date.now() - this.filmCache[name].timeStamp < environment.cacheTimeoutInMs) {
      return of(this.filmCache[name].films);
    }
    return this.http
      .jsonp<FilmObj[]>(`${environment.apiUrl}?term=${name}`, `callback`)
      .pipe(
        tap(films => {
          this.filmCache[name] = {films, timeStamp: Date.now()};
        }),
      );
  }

}

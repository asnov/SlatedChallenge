import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FilmCache, FilmObj } from '../data/models';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetFilmsService {

  filmCache: FilmCache = {};

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

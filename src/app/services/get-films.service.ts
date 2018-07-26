import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { FilmObj } from '../../data/models';


@Injectable({
  providedIn: 'root',
})
export class GetFilmsService {

  constructor(private http: HttpClient) { }

  getFilmsByName(name: string): Observable<FilmObj[]> {
    return name
      ? this.http
        .jsonp<FilmObj[]>(`${environment.apiUrl}?term=${name}`, `callback`)
      : of([]);
  }

}

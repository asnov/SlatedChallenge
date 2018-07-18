import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Film } from '../models/film';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetFilmsService {

  name = '';

  constructor(private http: HttpClient) {
  }

  getFilmsByName(name: string): Observable<Film[]> {
    this.name = name;
    console.log(name);
    return this.http.jsonp<Film[]>(`${environment.apiUrl}?term=${name}`, `callback`); // &callback=JSON_CALLBACK
  }

}

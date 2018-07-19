import { Component, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { FilmObj } from '../../data/models';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent {

  @Input()
  $films: Observable<FilmObj[]>;

  constructor() { }

}

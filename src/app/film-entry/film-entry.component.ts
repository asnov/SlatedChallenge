import { Component, Input } from '@angular/core';
import { FilmObj } from '../../data/models';

@Component({
  selector: 'app-film-entry',
  templateUrl: './film-entry.component.html',
  styleUrls: ['./film-entry.component.scss']
})
export class FilmEntryComponent {

  @Input()
  item: FilmObj;

  constructor() { }

}

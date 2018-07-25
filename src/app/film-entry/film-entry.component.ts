import { Component, Input } from '@angular/core';
import { FilmObj } from '../../data/models';
import { SanitizePipe } from '../pipes/sanitize.pipe';

@Component({
  selector: 'app-film-entry',
  templateUrl: './film-entry.component.html',
  styleUrls: ['./film-entry.component.scss'],
  providers: [SanitizePipe],
})
export class FilmEntryComponent {

  @Input()
  item: FilmObj;

  constructor() { }

}

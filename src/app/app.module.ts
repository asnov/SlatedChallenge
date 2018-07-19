import { BrowserModule } from '@angular/platform-browser';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmEntryComponent } from './film-entry/film-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    SanitizePipe,
    FilmListComponent,
    FilmEntryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

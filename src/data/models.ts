export interface FilmObj {
  value: string;
  description: string;
  obj_type: string;
  year: number;
  label: string;
  link_code: string;
  id: number;
  image_code: string;
}

export interface CachedFilm {
  films: FilmObj[];
  timeStamp: number;
}

export interface FilmCache {
  [index: string]: CachedFilm;
}

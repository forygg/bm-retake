export interface Rating {
  source: string;
  value: string;
}

export interface MovieShort {
  id: string;
  title: string;
  year: string;
  imageUrl: string;
  type: string;
}

export interface Movie extends MovieShort {
  rating: string;
  genre: string;
  released: string;
  country: string;
  runtime: string;
  plot: string;
  ratings: Rating[];
  directors: string[];
  writers: string[];
  actors: string[];
}

export interface MovieSearchResult {
  movies: MovieShort[];
}

export interface SavedMovie{
  id: string;
  review: string;
  rating: number;
}

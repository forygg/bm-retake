import { type Movie, type MovieSearchResult } from "@/types";

const API_BASE_URL = "https://www.omdbapi.com";

export const getMovieById = async (movieId: string): Promise<Movie> => {
  const response = await fetch(
    `${API_BASE_URL}/?i=${movieId}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const movieData: APIMovieData = await response.json();
  return {
    id: movieData.imdbID,
    title: movieData.Title,
    imageUrl: movieData.Poster,
    rating: movieData.imdbRating,
    genre: movieData.Genre,
    year: movieData.Year,
    released: movieData.Released,
    country: movieData.Country,
    runtime: movieData.Runtime,
    plot: movieData.Plot,
    directors: movieData.Director.split(", "),
    writers: movieData.Writer.split(", "),
    actors: movieData.Actors.split(", "),
    ratings: movieData.Ratings.map(
      (rating: { Source: string; Value: string }) => ({
        source: rating.Source,
        value: rating.Value,
      })
    ),
    type: movieData.Type,
  };
};

export const searchMovies = async ({
  search,
}: {
  search: string;
}): Promise<MovieSearchResult> => {
  const response = await fetch(
    `${API_BASE_URL}/?s=${search}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const movieData: APISearchResult = await response.json();
  console.log(movieData);
  if (movieData.Response === "True") {
    return {
      movies: movieData.Search.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        imageUrl: movie.Poster,
        type: movie.Type,
      })),
    };
  }
  return {
    movies: []
  };
};


interface APISearchResult {
  Search: APIMovieSearchResultData[];
  totalResults: string;
  Response: string;
}

interface APIMovieSearchResultData {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
}

interface APIMovieData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
}

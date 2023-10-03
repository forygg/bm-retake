import React, { use } from "react";
import {type Movie} from "@/types"
import { getMovieById } from "@/utils";
import MoviePageRender from "./render";

interface MoviePageProps {
  params: {
    movieId: string;
  };
}

export default function MoviePage({ params }: MoviePageProps) {
  const movie = use(getMovie(params.movieId));
  return <MoviePageRender movie={movie} />;
}

const getMovie = async (movieId: string): Promise<Movie> => {
  const movieData = await getMovieById(movieId);
  return movieData;
};

'use client';

import { type SavedMovie } from '@/types';

export const saveMovieReview = (movie: SavedMovie) => {
	let savedMovies: SavedMovie[] = [];
	const savedMoviesFromStorage = localStorage.getItem('savedMovies');

	if (savedMoviesFromStorage) {
		savedMovies = JSON.parse(savedMoviesFromStorage);
	}

	savedMovies.push(movie);
	localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
};

export const getSavedMovies = (): SavedMovie[] => {
	const savedMoviesFromStorage = localStorage.getItem('savedMovies');
	if (savedMoviesFromStorage) {
		return JSON.parse(savedMoviesFromStorage);
	}
	return [];
};

export const removeMovieReview = (movieId: string) => {
	const savedMovies: SavedMovie[] = JSON.parse(
		localStorage.getItem('savedMovies') ?? '[]'
	);
	const updatedSavedMovies = savedMovies.filter(
		(movie) => movie.id !== movieId
	);
	localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
};

export const getMovieReviewById = (movieId: string): SavedMovie | null => {
	const savedMoviesFromStorage = localStorage.getItem('savedMovies');

	if (savedMoviesFromStorage) {
		const savedMovies: SavedMovie[] = JSON.parse(savedMoviesFromStorage);
		const movie = savedMovies.find((item) => item.id === movieId);
		return movie ?? null;
	}

	return null;
};

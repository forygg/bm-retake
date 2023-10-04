'use client';

import { SavedMoviesTable } from '@/components';
import React, { useEffect, useState } from 'react';
import { type Movie } from '@/types';
import { getSavedMovies, removeMovieReview, getMovieById } from '@/utils';
import { Helmet } from 'react-helmet';

export default function Collection() {
	const [userMoviesData, setUserMoviesData] = useState<Movie[]>([]);

	useEffect(() => {
		async function fetchData() {
			const movies = getSavedMovies();
			const userMovies = [];

			if (movies.length !== 0) {
				for (let i = 0; i < movies.length; i++) {
					const movie = await getMovieById(movies[i].id);
					if (movie) {
						userMovies.push(movie);
					}
				}
			}
			setUserMoviesData(userMovies);
		}

		fetchData();
	}, []);
	const handleRemoveMovie = (movieId: string) => {
		removeMovieReview(movieId);
		const updatedMovies = userMoviesData.filter(
			(movie) => movie.id !== movieId
		);
		setUserMoviesData(updatedMovies);
	};

	return (
		<div className="flex flex-col items-center min-h-screen">
			<Helmet>Collection</Helmet>
			<div className="text-xl font-bold mb-10 mt-24">My movies</div>
			<SavedMoviesTable
				data={userMoviesData}
				onRemoveMovie={handleRemoveMovie}
			/>
		</div>
	);
}

'use client';

import React, { useState, useEffect } from 'react';
import { MovieCard, MovieDetailsModal, SearchBar } from '@/components';
import { type Movie, type MovieShort } from '@/types';
import { getMovieById, searchMovies } from '@/utils';
import { Helmet } from 'react-helmet';

export default function SearchPageRender() {
	const [movies, setMovies] = useState<MovieShort[]>([]);
	const [search, setSearch] = useState('');
	const [result, setResults] = useState(false);
	const [activeMovie, setActiveMovie] = useState<Movie>();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onSearch = (search: string) => {
		setSearch(search);
	};

	useEffect(() => {
		if (search === '') return;
		searchMovies({ search }).then((result) => {
			setResults(true);
			setMovies(result.movies);
		});
	}, [search]);

	const handleAddMovie = async (id: string) => {
		setIsModalOpen(true);
		setActiveMovie(await getMovieById(id));
	};

	return (
		<div className="container max-w-screen-xl mx-auto pt-24 px-8 min-h-screen">
			<Helmet>
				<title>Catalog</title>
			</Helmet>
			<SearchBar onSearch={onSearch} />
			{result && movies.length > 0 ? (
				<>
					<div className="grid grid-cols-4 flex-col gap-4 mt-8">
						{movies.map((movie, _id) => (
							<div className="col-span-1" key={_id}>
								<MovieCard movie={movie} onClickHandle={handleAddMovie} />
							</div>
						))}
					</div>
				</>
			) : result ? (
				<p className="mt-8 text-center text-gray-500">No movies found.</p>
			) : (
				<p className="mt-8 text-center text-gray-500">
					Find your favorite movie
				</p>
			)}
			{isModalOpen && (
				<MovieDetailsModal
					movieData={activeMovie}
					isOpened={isModalOpen}
					onClose={() => {
						setIsModalOpen(false);
					}}
				/>
			)}
		</div>
	);
}

'use client';

import React, { useState, useEffect } from 'react';
import type { Movie, SavedMovie } from '@/types';
import Image from 'next/image';
import { StarRating } from '@/components';
import { saveMovieReview, getMovieReviewById, getSavedMovies } from '@/utils';
import { Helmet } from 'react-helmet';

interface MoviePageRenderProps {
	movie: Movie;
}

const MoviePageRender: React.FC<MoviePageRenderProps> = ({ movie }) => {
	const pageTitle = movie.title;
	const [review, setReview] = useState('');
	const [rating, setRating] = useState(0);
	const [isSaved, setIsSaved] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isRatingEditable, setIsRatingEditable] = useState(true);

	useEffect(() => {
		const savedMovie = getMovieReviewById(movie.id);

		if (savedMovie) {
			setReview(savedMovie.review);
			setRating(savedMovie.rating);
			setIsSaved(true);
			setIsRatingEditable(false);
		}
	}, [movie.id]);

	const handleReviewChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setReview(e.target.value);
	};

	const handleSaveReview = () => {
		const existingReview = getMovieReviewById(movie.id);

		if (existingReview) {
			existingReview.review = review;
			existingReview.rating = rating;

			const savedReviews = getSavedMovies();

			const index = savedReviews.findIndex(
				(item: SavedMovie) => item.id === movie.id
			);

			savedReviews[index] = existingReview;

			localStorage.setItem('savedMovies', JSON.stringify(savedReviews));
		} else {
			saveMovieReview({
				id: movie.id,
				review,
				rating,
			});
		}

		setIsEditing(false);
		setIsSaved(true);
		setIsRatingEditable(false); // Disable rating after saving the review
	};

	const handleEditReview = () => {
		setIsEditing(true);
		setIsRatingEditable(true);
	};

	return (
		<div className="mx-auto p-8 bg-white py-20 flex flex-col justify-center max-w-5xl">
			<Helmet>
				<title>{pageTitle}</title>
			</Helmet>
			<div className="grid grid-cols-3 gap-8 center place-content-center">
				<div className="col-span-3 sm:col-span-1 md:col-span-1 lg:col-span-1">
					<div className="aspect-w-2 aspect-h-3 mx-auto">
						<Image
							src={
								movie.imageUrl !== 'N/A'
									? movie.imageUrl
									: '/placeholder-image.jpg'
							}
							alt="movie"
							width="300"
							height="450"
							className="object-cover rounded-lg"
						/>
					</div>
				</div>
				<div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2">
					<div className="flex flex-col gap-2">
						<h1 className="text-3xl font-semibold">{movie.title}</h1>
					</div>

					<div className="flex flex-col gap-2 mt-2">
						<p>
							{movie.released} ({movie.country})
						</p>
						<p>{movie.genre}</p>
						<p>{movie.runtime}</p>
					</div>

					<div className="flex items-center space-x-2">
						<span className="text-2xl">⭐{movie.rating}/10</span>
					</div>

					<h2 className="text-2xl font-semibold mt-10">Overview</h2>
					<p className="mt-2">{movie.plot}</p>

					<div className="grid grid-cols-3 gap-2 mt-10">
						<div className="col-span-1">
							<h2 className="text-2xl font-semibold">Actors</h2>
							{movie.actors.map((actor, _id) => (
								<p key={_id}>{actor}</p>
							))}
						</div>
						<div className="col-span-1">
							<h2 className="text-2xl font-semibold">Directors</h2>
							{movie.directors.map((director, _id) => (
								<p key={_id}>{director}</p>
							))}
						</div>
						<div className="col-span-1">
							<h2 className="text-2xl font-semibold">Writers</h2>
							{movie.writers.map((writer, _id) => (
								<p key={_id}>{writer}</p>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-6 mt-6">
				<div>
					<h2 className="text-xl font-semibold mb-2">Add Review</h2>
					<StarRating
						rating={rating}
						onRatingChange={setRating}
						editable={isRatingEditable}
					/>
					<textarea
						value={review}
						onChange={handleReviewChange}
						className="w-full h-32 p-2 border rounded focus:outline-none focus:border-blue-500"
						placeholder="Write your review here..."
						disabled={!isEditing && isSaved}
					/>
					<div className="flex gap-4 mt-4">
						{isEditing || !isSaved ? (
							<>
								<button
									onClick={() => handleSaveReview()}
									className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
								>
									Save
								</button>
								<button
									onClick={() => setIsEditing(false)}
									className="bg-gray-400 text-white px-4 py-2 rounded"
								>
									Cancel
								</button>
							</>
						) : (
							<button
								onClick={() => handleEditReview()}
								className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
							>
								Edit
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MoviePageRender;

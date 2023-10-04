'use client';

import React, { useState } from 'react';
import { type Movie } from '@/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface MovieDetailsModalProps {
	movieData: Movie | undefined;
	isOpened: boolean;
	onClose: () => void;
}

export default function MovieDetailsModal({
	movieData,
	isOpened,
	onClose,
}: MovieDetailsModalProps) {
	const { push } = useRouter();
	const [status, setStatus] = useState<
		'planned' | 'watched' | 'watching' | 'abandoned'
	>('planned');

	if (movieData === undefined) {
		return <></>;
	}

	return (
		<div
			className={`fixed inset-0 z-50 overflow-y-auto ${
				isOpened ? '' : 'hidden'
			}`}
		>
			<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>

				<span
					className="hidden sm:inline-block sm:align-middle sm:h-screen"
					aria-hidden="true"
				>
					&#8203;
				</span>

				<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
					<div className="bg-white p-8">
						<div className="grid grid-cols-2 gap-8">
							<div className="aspect-w-2 aspect-h-3">
								<Image
									className="object-cover rounded"
									src={
										movieData.imageUrl !== 'N/A'
											? movieData.imageUrl
											: '/placeholder-image.jpg'
									}
									alt="movie"
									width={480}
									height={720}
								/>
							</div>
							<div className="space-y-4">
								<h2 className="text-2xl font-bold">
									{movieData.title} ({movieData.year})
								</h2>
								<div className="flex space-x-4">
									<span className="text-sm text-gray-600">
										{movieData.released}
									</span>
									<span className="text-sm text-gray-600">
										{movieData.genre}
									</span>
									<span className="text-sm text-gray-600">
										{movieData.runtime}
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<span className="text-md">⭐ {movieData.rating}/10</span>
								</div>
								<h2 className="text-xl font-bold mt-4">Overview</h2>
								<p className="text-md">{movieData.plot}</p>
								<button
									onClick={() => {
										push(`/movie/${movieData.id}`);
									}}
									className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2"
								>
									Go to page
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

import React from 'react';
import Image from 'next/image';

interface MovieCardProps {
	movie: {
		id: string;
		imageUrl: string;
		title: string;
		year: string;
	};
	onClickHandle: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClickHandle }) => {
	return (
		<div
			className="bg-white shadow-sm p-4 rounded-lg cursor-pointer relative flex flex-col"
			onClick={() => {
				onClickHandle(movie.id);
			}}
		>
			<div className="aspect-w-21 aspect-h-30 mb-4">
				<Image
					src={
						movie.imageUrl !== 'N/A' ? movie.imageUrl : '/placeholder-image.jpg'
					}
					alt={movie.title}
					className="object-cover rounded"
					width={210}
					height={300}
				/>
			</div>
			<h2 className="text-xl font-bold mb-2 line-clamp-2">{movie.title}</h2>
			<span className="text-gray-600 text-sm mb-2">{movie.year}</span>
		</div>
	);
};

export default MovieCard;
